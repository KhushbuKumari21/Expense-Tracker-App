const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');

  console.log("AUTH HEADER:", authHeader);

  if (!authHeader) {
    return res.status(401).json({ msg: 'No token' });
  }

  try {
    const token = authHeader.replace('Bearer ', '').trim();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();

  } catch (err) {
    console.log("JWT ERROR:", err.message);
    return res.status(401).json({ msg: 'Invalid token' });
  }
};