const express = require('express');
const { z } = require('zod');
const prisma = require('../config/db');
const authTeacher = require('../middleware/authTeacher');

const router = express.Router();

router.use(authTeacher);

// ── GET /api/messages/conversations ───────────────────────────
router.get('/conversations', async (req, res) => {
  try {
    const conversations = await prisma.conversation.findMany({
      where: { teacher_id: req.teacherId },
      include: {
        messages: { orderBy: { sent_at: 'desc' }, take: 1 },
      },
      orderBy: { created_at: 'desc' },
    });

    const formatted = conversations.map(c => {
      const lastMsg = c.messages[0];
      const unread  = c.messages.filter(m => !m.read && m.sender_type !== 'teacher').length;
      return {
        id: c.id, type: c.type, name: c.participant_name,
        avatar: c.participant_avatar, is_group: c.is_group,
        members: c.group_size, online: false,
        lastMessage: lastMsg?.text || 'No messages yet',
        time: lastMsg ? new Date(lastMsg.sent_at).toLocaleDateString() : '',
        unread,
      };
    });

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ── GET /api/messages/conversations/:id ───────────────────────
router.get('/conversations/:id', async (req, res) => {
  try {
    const conversation = await prisma.conversation.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { messages: { orderBy: { sent_at: 'asc' } } },
    });

    if (!conversation || conversation.teacher_id !== req.teacherId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    res.json(conversation.messages);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ── POST /api/messages/conversations/:id/send ─────────────────
router.post('/conversations/:id/send', async (req, res) => {
  const schema = z.object({ text: z.string().min(1) });
  const result = schema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error.errors[0].message });

  try {
    const conversation = await prisma.conversation.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!conversation || conversation.teacher_id !== req.teacherId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const message = await prisma.message.create({
      data: {
        conversation_id: parseInt(req.params.id),
        sender_type: 'teacher',
        sender_id:   String(req.teacherId),
        text:        result.data.text,
        read:        true,
      },
    });

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ── PATCH /api/messages/conversations/:id/read ────────────────
router.patch('/conversations/:id/read', async (req, res) => {
  try {
    await prisma.message.updateMany({
      where: { conversation_id: parseInt(req.params.id), sender_type: { not: 'teacher' } },
      data: { read: true },
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
