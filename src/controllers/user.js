const User = require('../models/user');

exports.create = async (req, res) => {
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    permissionLevel: req.body.permissionLevel,
  });
  try {
    // eslint-disable-next-line object-curly-newline
    const data = await user.save();
    res.status(201).json(user.sanitise(data));
  } catch (err) {
    console.log('[Create Error]', err);
    if (err.name === 'ValidationError') {
      const emailError = err.errors.email ? err.errors.email.message : null;
      const passwordError = err.errors.password ? err.errors.password.message : null;
      res.status(400).json({
        errors: {
          email: emailError,
          password: passwordError,
        },
      });
    } else {
      res.sendStatus(500);
    }
  }
};

exports.list = async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
