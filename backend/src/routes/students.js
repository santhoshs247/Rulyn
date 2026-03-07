const express = require('express');
const { z } = require('zod');
const prisma = require('../config/db');
const authStudent = require('../middleware/authStudent');

const router = express.Router();

// All student routes require Clerk JWT
router.use(authStudent);

// ── Badge definitions ─────────────────────────────────────────
const BADGE_DEFS = [
  { id: 'first_steps',      name: 'First Steps',       icon: '🌱', rarity: 'common',    xpReward: 50,  desc: 'Complete your first story' },
  { id: 'science_whiz',     name: 'Science Whiz',      icon: '🧪', rarity: 'rare',      xpReward: 150, desc: 'Complete 5 Science stories' },
  { id: 'streak_master',    name: 'Streak Master',     icon: '🔥', rarity: 'epic',      xpReward: 300, desc: 'Maintain a 7-day streak' },
  { id: 'quiz_champ',       name: 'Quiz Champion',     icon: '🏆', rarity: 'legendary', xpReward: 500, desc: 'Score 100% on 10 quizzes', total: 10 },
  { id: 'speed_demon',      name: 'Speed Demon',       icon: '⚡', rarity: 'epic',      xpReward: 250, desc: 'Complete a quiz in under 2 minutes', total: 1 },
  { id: 'knowledge_seeker', name: 'Knowledge Seeker',  icon: '📚', rarity: 'rare',      xpReward: 200, desc: 'Read 50 stories', total: 50 },
  { id: 'perfect_week',     name: 'Perfect Week',      icon: '⭐', rarity: 'legendary', xpReward: 600, desc: 'Learn every day for 7 days', total: 7 },
  { id: 'math_master',      name: 'Math Master',       icon: '🔢', rarity: 'epic',      xpReward: 400, desc: 'Complete 30 Math stories', total: 30 },
];

// ── POST /api/student/sync ─ upsert student on Clerk login ────
router.post('/sync', async (req, res) => {
  const schema = z.object({
    name:  z.string(),
    email: z.string().email(),
    grade: z.number().optional().default(8),
  });
  const result = schema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error.errors[0].message });

  try {
    const student = await prisma.student.upsert({
      where: { id: req.studentId },
      create: { id: req.studentId, ...result.data, last_active: new Date() },
      update: { name: result.data.name, email: result.data.email, last_active: new Date() },
    });

    // Create default settings if not exist
    await prisma.studentSettings.upsert({
      where: { student_id: req.studentId },
      create: { student_id: req.studentId },
      update: {},
    });

    // Init badge progress rows
    for (const badge of BADGE_DEFS) {
      if (badge.total) {
        await prisma.badgeProgress.upsert({
          where: { student_id_badge_key: { student_id: req.studentId, badge_key: badge.id } },
          create: { student_id: req.studentId, badge_key: badge.id, progress: 0, total: badge.total },
          update: {},
        });
      }
    }

    res.json({ success: true, student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── GET /api/student/profile ──────────────────────────────────
router.get('/profile', async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
      where: { id: req.studentId },
      include: {
        badges:          true,
        story_progress:  { where: { completed: true } },
        quiz_submissions:true,
        class:           { include: { assignments: { include: { completions: { where: { student_id: req.studentId } } } } } },
      },
    });

    if (!student) return res.status(404).json({ error: 'Student not found. Please sync first.' });

    const completedStories  = student.story_progress.map(sp => sp.story_id);
    const completedQuizzes  = student.quiz_submissions.map(qs => qs.story_id);
    const badgeKeys         = student.badges.map(b => b.badge_key);

    // Assignments
    const allAssignments      = student.class?.assignments || [];
    const pendingAssignments  = allAssignments.filter(a => a.completions.length === 0 && a.status === 'active').map(a => a.id);
    const completedAssignments= allAssignments.filter(a => a.completions.length > 0).map(a => a.id);

    res.json({
      id: student.id, name: student.name, email: student.email,
      grade: student.grade, xp: student.xp, level: student.level, streak: student.streak,
      completedStories, completedQuizzes, badges: badgeKeys,
      dailyProgress: { storiesCompleted: 0, quizzesTaken: 0, minutesLearned: 0 },
      assignments: { pending: pendingAssignments, completed: completedAssignments },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── PUT /api/student/profile ──────────────────────────────────
router.put('/profile', async (req, res) => {
  const schema = z.object({
    name:  z.string().optional(),
    grade: z.number().optional(),
  });
  const result = schema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error.errors[0].message });

  try {
    const updated = await prisma.student.update({
      where: { id: req.studentId },
      data: { ...result.data, last_active: new Date() },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ── POST /api/student/progress ────────────────────────────────
router.post('/progress', async (req, res) => {
  const schema = z.object({
    storyId:   z.number().optional(),
    completed: z.boolean().optional(),
    xpGained:  z.number().optional(),
    streak:    z.number().optional(),
  });
  const result = schema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error.errors[0].message });

  try {
    const { storyId, completed, xpGained, streak } = result.data;

    // Update story progress if storyId given
    if (storyId) {
      await prisma.storyProgress.upsert({
        where: { story_id_student_id: { story_id: storyId, student_id: req.studentId } },
        create: { story_id: storyId, student_id: req.studentId, completed: completed ?? false, completed_at: completed ? new Date() : null },
        update: { completed: completed ?? false, completed_at: completed ? new Date() : null },
      });
    }

    // Update XP and streak
    const dataToUpdate = { last_active: new Date() };
    if (xpGained) dataToUpdate.xp = { increment: xpGained };
    if (streak !== undefined) dataToUpdate.streak = streak;

    const student = await prisma.student.update({
      where: { id: req.studentId },
      data: dataToUpdate,
    });

    // Recalculate level
    const newLevel = Math.floor(student.xp / 500) + 1;
    if (newLevel !== student.level) {
      await prisma.student.update({ where: { id: req.studentId }, data: { level: newLevel } });
    }

    // Badge checks
    await checkAndAwardBadges(req.studentId, student);

    res.json({ success: true, xp: student.xp + (xpGained || 0), level: newLevel });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── GET /api/student/achievements ─────────────────────────────
router.get('/achievements', async (req, res) => {
  try {
    const student = await prisma.student.findUnique({ where: { id: req.studentId } });
    if (!student) return res.status(404).json({ error: 'Student not found' });

    const earnedBadges   = await prisma.badge.findMany({ where: { student_id: req.studentId } });
    const badgeProgress  = await prisma.badgeProgress.findMany({ where: { student_id: req.studentId } });
    const earnedKeys     = earnedBadges.map(b => b.badge_key);

    const badges = BADGE_DEFS.map(def => {
      const earned = earnedKeys.includes(def.id);
      const earnedRecord = earnedBadges.find(b => b.badge_key === def.id);
      const progressRecord = badgeProgress.find(b => b.badge_key === def.id);
      return {
        id: def.id, name: def.name, desc: def.desc, icon: def.icon,
        rarity: def.rarity, xpReward: def.xpReward, earned,
        ...(earned && { earnedDate: new Date(earnedRecord.earned_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }),
        ...(progressRecord && !earned && { progress: progressRecord.progress, total: progressRecord.total }),
      };
    });

    const rank = student.level <= 5 ? 'Explorer I' : student.level <= 10 ? 'Explorer II' : 'Explorer III';

    res.json({
      stats: {
        totalXP: student.xp, level: student.level,
        nextLevelXP: student.level * 500,
        badgesEarned: earnedBadges.length, totalBadges: BADGE_DEFS.length, rank,
      },
      badges,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── GET /api/student/badges ───────────────────────────────────
router.get('/badges', async (req, res) => {
  try {
    const earned = await prisma.badge.findMany({ where: { student_id: req.studentId } });
    res.json(earned);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ── GET /api/student/assignments ──────────────────────────────
router.get('/assignments', async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
      where: { id: req.studentId },
      include: {
        class: {
          include: {
            assignments: {
              include: {
                story:      { select: { id: true, title: true, subject: true, cover_image: true } },
                teacher:    { select: { name: true } },
                completions:{ where: { student_id: req.studentId } },
              },
            },
          },
        },
      },
    });

    const assignments = (student?.class?.assignments || []).map(a => ({
      id: a.id, title: a.title, description: a.description, type: a.type,
      storyId: a.story_id, story: a.story,
      teacherName: a.teacher?.name || 'Teacher',
      dueDate: a.due_date, assignedDate: a.assigned_date,
      points: a.points, status: a.status,
      completed: a.completions.length > 0,
    }));

    res.json(assignments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── POST /api/student/assignments/:id/complete ────────────────
router.post('/assignments/:id/complete', async (req, res) => {
  const assignmentId = parseInt(req.params.id);
  try {
    await prisma.assignmentCompletion.upsert({
      where: { assignment_id_student_id: { assignment_id: assignmentId, student_id: req.studentId } },
      create: { assignment_id: assignmentId, student_id: req.studentId },
      update: {},
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ── GET /api/student/settings ─────────────────────────────────
router.get('/settings', async (req, res) => {
  try {
    const settings = await prisma.studentSettings.findUnique({ where: { student_id: req.studentId } });
    res.json(settings || { theme: 'light', language: 'english', notifications: {} });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ── PUT /api/student/settings ─────────────────────────────────
router.put('/settings', async (req, res) => {
  try {
    const settings = await prisma.studentSettings.update({
      where: { student_id: req.studentId },
      data: req.body,
    });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ── Badge auto-award helper ────────────────────────────────────
async function checkAndAwardBadges(studentId, student) {
  try {
    const completedStories = await prisma.storyProgress.count({ where: { student_id: studentId, completed: true } });
    const scienceStories   = await prisma.storyProgress.count({
      where: { student_id: studentId, completed: true, story: { subject: 'Science' } },
    });

    const award = async (key) => {
      await prisma.badge.upsert({
        where: { student_id_badge_key: { student_id: studentId, badge_key: key } },
        create: { student_id: studentId, badge_key: key },
        update: {},
      });
    };

    if (completedStories >= 1) await award('first_steps');
    if (scienceStories >= 5)   await award('science_whiz');
    if (student.streak >= 7)   await award('streak_master');
  } catch (err) {
    console.error('Badge check error:', err.message);
  }
}

module.exports = router;
