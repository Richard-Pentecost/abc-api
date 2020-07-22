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

exports.find = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
  
    res.status(201).json({
      name: user.name,
      username: user.username,
      email: user.email,
      permissionLevel: user.permissionLevel,
      id: user._id,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: 'User could not be found '});
  }
};

exports.updateUser = (req, res) => {
  User.findById(req.params.userId, async (err, user) => {
    if (!user) {
      res.status(404).json({ error: 'User could not be found' });
    } else {
      const updatedUser = await user.set(req.body).save();
      res.status(200).json(updatedUser);
    }
  });
};

exports.updatePassword = (req, res) => {
  User.findById(req.params.userId, async (err, user) => {
    if (!user) {
      res.status(404).json({ error: 'User could not be found' });
    } else {
      const { oldPassword, newPassword } = req.body
      if (!await user.validatePassword(oldPassword)) {
        console.log('here');
        res.status(401).json({ error: 'Old password is incorrect' });
      }
      const updatedUser = await user.set({ password: newPassword }).save();
      res.status(200).json(updatedUser);
    }
  });
};

exports.delete = (req, res) => {
  User.findByIdAndDelete(req.params.userId, (err) => {
    if (err) {
      res.status(404).json({ error: 'User could not be found' });
    } else {
      res.sendStatus(200);
    }
  });
};
