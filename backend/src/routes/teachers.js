const express = require('express');
const { z } = require('zod');
const prisma = require('../config/db');
const authTeacher = require('../middleware/authTeacher');

const router = express.Router();

// ── GET /api/teacher/dashboard ─────────────────────────────────
router.get('/dashboard', async (req, res) => {
  // Supports query param ?email= for TeacherDashboard.jsx direct fetch OR auth header
  let teacherId = null;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const jwt = require('jsonwebtoken');
      const payload = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET);
      teacherId = payload.teacherId;
    } catch {}
  }

  if (!teacherId && req.query.email) {
    const t = await prisma.teacher.findUnique({ where: { email: req.query.email } });
    if (t) teacherId = t.id;
  }

  if (!teacherId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const teacher = await prisma.teacher.findUnique({ where: { id: teacherId } });
    if (!teacher) return res.status(404).json({ error: 'Teacher not found' });

    // Get all students in teacher's classes
    const classes = await prisma.class.findMany({
      where: { teacher_id: teacherId },
      include: { students: true },
    });

    const allStudents = classes.flatMap(c => c.students);
    const activeStudents = allStudents.filter(s =>
      s.last_active && new Date() - new Date(s.last_active) < 24 * 60 * 60 * 1000
    ).length;

    // Get completed stories/quizzes for analytics
    const totalCompleted  = await prisma.storyProgress.count({ where: { student: { class: { teacher_id: teacherId } }, completed: true } });
    const quizSubmissions = await prisma.quizSubmission.findMany({ where: { student: { class: { teacher_id: teacherId } } } });
    const avgScore        = quizSubmissions.length > 0 ? Math.round(quizSubmissions.reduce((sum, q) => sum + q.percentage, 0) / quizSubmissions.length) : 0;

    res.json({
      teacher: {
        id: teacher.id, name: teacher.name, email: teacher.email,
        subject: teacher.subject, school: teacher.school,
        school_code: teacher.school_code,
        languageProfile: { primary: teacher.language_preference },
      },
      analytics: {
        activeStudents,
        conceptsMastered: totalCompleted,
        averageEngagement: avgScore,
        learningEnergy: {
          understanding: Math.min(100, avgScore),
          engagement:    Math.min(100, activeStudents > 0 ? Math.round((activeStudents / Math.max(allStudents.length, 1)) * 100) : 75),
          completion:    Math.min(100, totalCompleted > 0 ? 70 : 0),
          participation: 85,
        },
      },
      messages: [],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// All routes below require teacher auth
router.use(authTeacher);

// ── GET /api/teacher/profile ──────────────────────────────────
router.get('/profile', async (req, res) => {
  try {
    const teacher = await prisma.teacher.findUnique({ where: { id: req.teacherId } });
    if (!teacher) return res.status(404).json({ error: 'Not found' });

    const classes = await prisma.class.findMany({ where: { teacher_id: req.teacherId }, include: { _count: { select: { students: true } } } });
    const totalStudents = classes.reduce((sum, c) => sum + c._count.students, 0);
    const assignmentsCreated = await prisma.assignment.count({ where: { teacher_id: req.teacherId } });

    res.json({
      id: teacher.id, name: teacher.name, email: teacher.email,
      subject: teacher.subject, school: teacher.school, school_code: teacher.school_code,
      phone: teacher.phone, language_preference: teacher.language_preference,
      stats: { totalStudents, assignmentsCreated, avgClassScore: 87 },
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ── PUT /api/teacher/profile ──────────────────────────────────
router.put('/profile', async (req, res) => {
  const schema = z.object({
    name:    z.string().optional(),
    email:   z.string().email().optional(),
    phone:   z.string().optional(),
    school:  z.string().optional(),
    subject: z.string().optional(),
  });
  const result = schema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error.errors[0].message });

  try {
    const updated = await prisma.teacher.update({ where: { id: req.teacherId }, data: result.data });
    res.json({ success: true, teacher: updated });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ── GET /api/teacher/students ─────────────────────────────────
router.get('/students', async (req, res) => {
  try {
    const classes = await prisma.class.findMany({
      where: { teacher_id: req.teacherId },
      include: {
        students: {
          include: {
            story_progress:   { where: { completed: true } },
            quiz_submissions: true,
            badges:           true,
          },
        },
      },
    });

    const allStudents = classes.flatMap(c =>
      c.students.map(s => {
        const quizzes = s.quiz_submissions;
        const avgScore = quizzes.length > 0
          ? Math.round(quizzes.reduce((sum, q) => sum + q.percentage, 0) / quizzes.length)
          : 0;

        const hoursSinceActive = s.last_active
          ? Math.round((new Date() - new Date(s.last_active)) / (1000 * 60 * 60))
          : null;

        const status = !s.last_active || hoursSinceActive > 168 ? 'inactive'
          : avgScore >= 90 ? 'rising'
          : avgScore < 70  ? 'needs-support'
          : 'active';

        const lastActive = !s.last_active ? 'Never'
          : hoursSinceActive < 1    ? 'Just now'
          : hoursSinceActive < 24   ? `${hoursSinceActive} hours ago`
          : `${Math.round(hoursSinceActive / 24)} days ago`;

        return {
          id: s.id, name: s.name, email: s.email, grade: s.grade,
          xp: s.xp, streak: s.streak,
          storiesRead:   s.story_progress.length,
          quizzesTaken:  quizzes.length,
          avgScore, status, lastActive,
          avatar: '👤',
        };
      })
    );

    res.json(allStudents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── GET /api/teacher/students/:id/journey ─────────────────────
router.get('/students/:id/journey', async (req, res) => {
  try {
    const progress  = await prisma.storyProgress.findMany({ where: { student_id: req.params.id, completed: true }, include: { story: true }, orderBy: { completed_at: 'desc' }, take: 5 });
    const quizzes   = await prisma.quizSubmission.findMany({ where: { student_id: req.params.id }, include: { story: true }, orderBy: { submitted_at: 'desc' }, take: 5 });

    const events = [
      ...progress.map(p => ({ type: 'story', title: `Completed: ${p.story.title}`, xp: p.story.xp, time: p.completed_at })),
      ...quizzes.map(q => ({ type: 'quiz', title: `Quiz: ${q.story.title} - Score: ${q.percentage}%`, xp: q.xp_earned, time: q.submitted_at })),
    ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 10);

    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ── GET /api/teacher/classes ──────────────────────────────────
router.get('/classes', async (req, res) => {
  try {
    const classes = await prisma.class.findMany({
      where: { teacher_id: req.teacherId },
      include: { _count: { select: { students: true } } },
    });
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ── POST /api/teacher/classes ─────────────────────────────────
router.post('/classes', async (req, res) => {
  const schema = z.object({ name: z.string(), school_code: z.string().optional() });
  const result = schema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error.errors[0].message });

  try {
    const newClass = await prisma.class.create({ data: { ...result.data, teacher_id: req.teacherId } });
    res.status(201).json(newClass);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ── PUT /api/teacher/settings ─────────────────────────────────
router.put('/settings', async (req, res) => {
  try {
    const updated = await prisma.teacher.update({
      where: { id: req.teacherId },
      data: { notifications: req.body.notifications, language_preference: req.body.language },
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ── POST /api/teacher/settings/language ───────────────────────
router.post('/settings/language', async (req, res) => {
  // Also supports email-based update for TeacherDashboard direct call
  try {
    let teacherId = req.teacherId;
    if (!teacherId && req.body.email) {
      const t = await prisma.teacher.findUnique({ where: { email: req.body.email } });
      if (t) teacherId = t.id;
    }
    if (!teacherId) return res.status(401).json({ error: 'Unauthorized' });

    await prisma.teacher.update({
      where: { id: teacherId },
      data: { language_preference: req.body.language },
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
