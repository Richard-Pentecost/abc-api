const User = require('../models/user');

exports.create = async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    // eslint-disable-next-line object-curly-newline
    const data = await user.save();
    res.status(201).json(user.sanitise(data));
  } catch (err) {
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
