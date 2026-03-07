const express = require('express');
const { z } = require('zod');
const prisma = require('../config/db');
const authTeacher = require('../middleware/authTeacher');

const router = express.Router();

router.use(authTeacher);

// ── GET /api/schedule ─────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const events = await prisma.scheduleEvent.findMany({
      where: { teacher_id: req.teacherId },
      orderBy: { date: 'asc' },
    });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ── POST /api/schedule ────────────────────────────────────────
router.post('/', async (req, res) => {
  const schema = z.object({
    title:      z.string(),
    type:       z.enum(['lesson', 'quiz', 'live', 'deadline']),
    date:       z.string(),
    time:       z.string(),
    duration:   z.string().optional().default('45 min'),
    class_name: z.string().optional().default(''),
    color:      z.string().optional().default('from-blue-500 to-indigo-600'),
  });
  const result = schema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error.errors[0].message });

  try {
    const event = await prisma.scheduleEvent.create({ data: { ...result.data, teacher_id: req.teacherId } });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ── PUT /api/schedule/:id ─────────────────────────────────────
router.put('/:id', async (req, res) => {
  try {
    const event = await prisma.scheduleEvent.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!event || event.teacher_id !== req.teacherId) return res.status(403).json({ error: 'Forbidden' });

    const updated = await prisma.scheduleEvent.update({ where: { id: parseInt(req.params.id) }, data: req.body });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ── DELETE /api/schedule/:id ──────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const event = await prisma.scheduleEvent.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!event || event.teacher_id !== req.teacherId) return res.status(403).json({ error: 'Forbidden' });

    await prisma.scheduleEvent.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
