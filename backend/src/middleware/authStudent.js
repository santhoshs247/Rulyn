const { createClerkClient } = require('@clerk/backend');

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

/**
 * Middleware: verify Clerk JWT from Authorization header.
 * Attaches req.studentId (Clerk user ID) on success.
 */
async function authStudent(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No auth token provided' });
    }

    const token = authHeader.split(' ')[1];
    const { sub } = await clerkClient.verifyToken(token);

    req.studentId = sub;
    next();
  } catch (err) {
    console.error('Student auth error:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = authStudent;
