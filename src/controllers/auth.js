const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!await user.validatePassword(password)) {
      res.status(401).json({ error: 'User/password combination incorrect' });
    }

    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      id: user._id,
    };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.status(201).json({ token });
      }
    });
  } catch (err) {
    res.status(401).json({ error: 'User not found' });
  }
};
