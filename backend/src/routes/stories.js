const express = require('express');
const { z } = require('zod');
const prisma = require('../config/db');
const authTeacher = require('../middleware/authTeacher');
const authStudent = require('../middleware/authStudent');

const router = express.Router();

// ── GET /api/stories ──────────────────────────────────────────
// Public - both student and teacher can read
router.get('/', async (req, res) => {
  try {
    const { subject, difficulty, grade } = req.query;
    const where = { status: 'published' };
    if (subject)    where.subject = subject;
    if (difficulty) where.difficulty = difficulty;
    if (grade)      where.grade_range = grade;

    const stories = await prisma.story.findMany({
      where,
      select: {
        id: true, title: true, topic: true, subject: true, description: true,
        cover_image: true, grade_range: true, difficulty: true, read_time: true, xp: true, status: true,
      },
      orderBy: { id: 'asc' },
    });

    // format to match frontend shape
    const formatted = stories.map(s => ({
      id: s.id, title: s.title, topic: s.topic, subject: s.subject,
      description: s.description, coverImage: s.cover_image,
      grade: s.grade_range, difficulty: s.difficulty,
      readTime: s.read_time, xp: s.xp,
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── GET /api/stories/:id ──────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const story = await prisma.story.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!story) return res.status(404).json({ error: 'Story not found' });

    res.json({
      id: story.id, title: story.title, topic: story.topic, subject: story.subject,
      description: story.description, coverImage: story.cover_image,
      grade: story.grade_range, difficulty: story.difficulty,
      readTime: story.read_time, xp: story.xp,
      content: story.content, quiz: story.quiz,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ── POST /api/stories ─────────────────────────────────────────
router.post('/', authTeacher, async (req, res) => {
  const schema = z.object({
    title:       z.string(),
    topic:       z.string().optional().default(''),
    subject:     z.string(),
    description: z.string().optional().default(''),
    cover_image: z.string().optional().default('📖'),
    grade_range: z.string().optional().default(''),
    difficulty:  z.string().optional().default('Easy'),
    read_time:   z.string().optional().default('5 min'),
    xp:          z.number().optional().default(50),
    content:     z.array(z.object({ image: z.string(), text: z.string() })),
    quiz:        z.array(z.object({ question: z.string(), options: z.array(z.string()), correct: z.number() })),
    status:      z.enum(['published', 'draft']).optional().default('published'),
  });
  const result = schema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error.errors[0].message });

  try {
    const story = await prisma.story.create({ data: { ...result.data, created_by: req.teacherId } });
    res.status(201).json(story);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ── PUT /api/stories/:id ──────────────────────────────────────
router.put('/:id', authTeacher, async (req, res) => {
  try {
    const story = await prisma.story.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!story || (story.created_by && story.created_by !== req.teacherId)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const updated = await prisma.story.update({ where: { id: parseInt(req.params.id) }, data: req.body });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ── DELETE /api/stories/:id ───────────────────────────────────
router.delete('/:id', authTeacher, async (req, res) => {
  try {
    const story = await prisma.story.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!story || !story.created_by || story.created_by !== req.teacherId) {
      return res.status(403).json({ error: 'Cannot delete a built-in story' });
    }
    await prisma.story.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
