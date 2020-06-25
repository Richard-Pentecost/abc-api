const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.get('Authorization');
  jwt.verify(token, process.env.JWT_SECRET, (error, authorizer) => {
    if (error) {
      res.status(401).json({ message: 'You are not authorized to do this' });
    } else {
      req.authorizer = authorizer;
      next();
    }
  });
};

module.exports = auth;
