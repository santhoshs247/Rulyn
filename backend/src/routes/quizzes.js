const express = require('express');
const { z } = require('zod');
const prisma = require('../config/db');
const authStudent = require('../middleware/authStudent');

const router = express.Router();

// POST /api/quizzes/:storyId/submit
router.post('/:storyId/submit', authStudent, async (req, res) => {
  const schema = z.object({
    answers: z.array(z.number()),
  });
  const result = schema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error.errors[0].message });

  const storyId = parseInt(req.params.storyId);

  try {
    const story = await prisma.story.findUnique({ where: { id: storyId } });
    if (!story) return res.status(404).json({ error: 'Story not found' });

    const quiz = story.quiz;
    const { answers } = result.data;

    // Score the quiz
    let score = 0;
    quiz.forEach((q, i) => {
      if (answers[i] === q.correct) score++;
    });

    const maxScore   = quiz.length;
    const percentage = Math.round((score / maxScore) * 100);
    const xpEarned   = Math.round(story.xp * (percentage / 100));
    const passed     = percentage >= 60;

    // Save submission
    await prisma.quizSubmission.create({
      data: {
        story_id: storyId, student_id: req.studentId,
        score, max_score: maxScore, percentage, xp_earned: xpEarned,
        answers: answers,
      },
    });

    // Award XP to student
    const updatedStudent = await prisma.student.update({
      where: { id: req.studentId },
      data: { xp: { increment: xpEarned }, last_active: new Date() },
    });

    // Recompute level
    const newLevel = Math.floor(updatedStudent.xp / 500) + 1;
    if (newLevel !== updatedStudent.level) {
      await prisma.student.update({ where: { id: req.studentId }, data: { level: newLevel } });
    }

    // Check quiz_champ badge progress
    const perfectQuizzes = await prisma.quizSubmission.count({
      where: { student_id: req.studentId, percentage: 100 },
    });
    await prisma.badgeProgress.upsert({
      where: { student_id_badge_key: { student_id: req.studentId, badge_key: 'quiz_champ' } },
      create: { student_id: req.studentId, badge_key: 'quiz_champ', progress: perfectQuizzes, total: 10 },
      update: { progress: perfectQuizzes },
    });
    if (perfectQuizzes >= 10) {
      await prisma.badge.upsert({
        where: { student_id_badge_key: { student_id: req.studentId, badge_key: 'quiz_champ' } },
        create: { student_id: req.studentId, badge_key: 'quiz_champ' },
        update: {},
      });
    }

    res.json({
      score, maxScore, percentage, xpEarned, passed,
      newTotalXP: updatedStudent.xp + xpEarned,
      newLevel,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
