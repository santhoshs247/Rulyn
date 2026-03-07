const jwt = require('jsonwebtoken');

/**
 * Middleware: verify custom Teacher JWT.
 * Attaches req.teacherId on success.
 */
function authTeacher(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No auth token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.teacherId = payload.teacherId;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = authTeacher;
