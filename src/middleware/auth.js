const jwt = require('jsonwebtoken');

/**
 * Express middleware to authenticate requests using JWT.
 *
 * The token is expected in the `Authorization` header as `Bearer <token>`.
 * On success, the decoded payload is attached to `req.user`.
 * On failure, a 401 response is returned.
 */
function auth(req, res, next) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

/**
 * Middleware to ensure the user has an admin role.
 */
function admin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Forbidden: Admins only' });
}

module.exports = { auth, admin };
