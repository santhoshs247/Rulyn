const express = require('express');
const { z } = require('zod');
const prisma = require('../config/db');
const authTeacher = require('../middleware/authTeacher');
const authStudent = require('../middleware/authStudent');

const router = express.Router();

// ── GET /api/assignments — teacher sees their assignments ──────
router.get('/', authTeacher, async (req, res) => {
  try {
    const assignments = await prisma.assignment.findMany({
      where: { teacher_id: req.teacherId },
      include: {
        story:       { select: { id: true, title: true, subject: true, cover_image: true } },
        class:       { select: { name: true } },
        completions: true,
      },
      orderBy: { created_at: 'desc' },
    });

    const formatted = assignments.map(a => ({
      id: a.id, title: a.title, description: a.description, type: a.type,
      storyId: a.story_id, story: a.story, class: a.class?.name,
      dueDate: a.due_date, assignedDate: a.assigned_date,
      points: a.points, status: a.status,
      completedBy: a.completions.map(c => c.student_id),
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ── POST /api/assignments ─────────────────────────────────────
router.post('/', authTeacher, async (req, res) => {
  const schema = z.object({
    title:       z.string(),
    description: z.string().optional().default(''),
    type:        z.enum(['quiz', 'story', 'story+quiz']),
    story_id:    z.number().optional(),
    class_id:    z.number(),
    due_date:    z.string(),
    points:      z.number().optional().default(100),
  });
  const result = schema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error.errors[0].message });

  try {
    const assignment = await prisma.assignment.create({
      data: { ...result.data, teacher_id: req.teacherId, due_date: new Date(result.data.due_date) },
    });
    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ── PUT /api/assignments/:id ──────────────────────────────────
router.put('/:id', authTeacher, async (req, res) => {
  try {
    const assignment = await prisma.assignment.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!assignment || assignment.teacher_id !== req.teacherId) return res.status(403).json({ error: 'Forbidden' });

    const updated = await prisma.assignment.update({ where: { id: parseInt(req.params.id) }, data: req.body });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ── DELETE /api/assignments/:id ───────────────────────────────
router.delete('/:id', authTeacher, async (req, res) => {
  try {
    const assignment = await prisma.assignment.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!assignment || assignment.teacher_id !== req.teacherId) return res.status(403).json({ error: 'Forbidden' });

    await prisma.assignmentCompletion.deleteMany({ where: { assignment_id: parseInt(req.params.id) } });
    await prisma.assignment.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ── GET /api/assignments/class/:classId — student gets class assignments ──
router.get('/class/:classId', authStudent, async (req, res) => {
  try {
    const assignments = await prisma.assignment.findMany({
      where: { class_id: parseInt(req.params.classId), status: 'active' },
      include: {
        story:       { select: { id: true, title: true, subject: true, cover_image: true, read_time: true } },
        teacher:     { select: { name: true } },
        completions: { where: { student_id: req.studentId } },
      },
    });

    const formatted = assignments.map(a => ({
      id: a.id, title: a.title, description: a.description, type: a.type,
      storyId: a.story_id, story: a.story, teacherName: a.teacher?.name,
      dueDate: a.due_date, points: a.points, status: a.status,
      completed: a.completions.length > 0,
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
