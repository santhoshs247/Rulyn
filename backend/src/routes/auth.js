const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const prisma = require('../config/db');
const authTeacher = require('../middleware/authTeacher');

const router = express.Router();

// POST /api/auth/teacher/login
router.post('/teacher/login', async (req, res) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
  });

  const result = schema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error.errors[0].message });

  const { email, password } = result.data;

  try {
    const teacher = await prisma.teacher.findUnique({ where: { email } });
    if (!teacher) return res.status(401).json({ error: 'Invalid email or password' });

    const match = await bcrypt.compare(password, teacher.password_hash);
    if (!match) return res.status(401).json({ error: 'Invalid email or password' });

    const token = jwt.sign(
      { teacherId: teacher.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      token,
      teacher: {
        id: teacher.id,
        name: teacher.name,
        email: teacher.email,
        subject: teacher.subject,
        school: teacher.school,
        school_code: teacher.school_code,
        languageProfile: { primary: teacher.language_preference },
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/auth/teacher/change-password
router.post('/teacher/change-password', authTeacher, async (req, res) => {
  const schema = z.object({
    currentPassword: z.string().min(1),
    newPassword: z.string().min(6),
  });

  const result = schema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error.errors[0].message });

  try {
    const teacher = await prisma.teacher.findUnique({ where: { id: req.teacherId } });
    const match = await bcrypt.compare(result.data.currentPassword, teacher.password_hash);
    if (!match) return res.status(401).json({ error: 'Current password is incorrect' });

    const hash = await bcrypt.hash(result.data.newPassword, 10);
    await prisma.teacher.update({ where: { id: req.teacherId }, data: { password_hash: hash } });

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
