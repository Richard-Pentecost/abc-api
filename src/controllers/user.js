const User = require('../models/user');
const { userErrorMessages } = require('../utils/errorMessages');

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
      const errorObj = userErrorMessages(err);
      res.status(401).json({ errors: errorObj });
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
    res.status(404).json({ error: 'User could not be found '});
  }
};

exports.updateUser = async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json({ error: 'User could not be found' });
  }

  const { name, username } = req.body;
  if (!name || !username) {
    const nameError = !name ? 'A name must be provided' : null;
    const usernameError = !username ? 'A username must be provided' : null;
    const errorObj = { name: nameError, username: usernameError };
    return res.status(404).json({ errors: errorObj });
  }

  try {
    const updatedUser = await user.updateOne(req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errorObj = userErrorMessages(err);
      res.status(404).json({ errors: errorObj });
    } else {
      res.sendStatus(500);
    }
  }
};

exports.updatePassword = (req, res) => {
  User.findById(req.params.userId, async (error, user) => {
    if (!user) {
      res.status(404).json({ error: 'User could not be found' });
    } else {
      const { oldPassword, newPassword } = req.body;
      const validPassword = await user.validatePassword(oldPassword);
      if (validPassword) {
        try {
          // const updatedUser = await user.set({ password: newPassword }).save();
          const updatedUser = await user.updateOne({ password: newPassword });
          res.status(200).json(updatedUser);
        } catch (err) {
          if (err.name === 'ValidationError') {
            const errorObj = userErrorMessages(err);
            res.status(404).json({ errors: errorObj });
          } else {
            res.sendStatus(500);
          }
        }
      } else {
        res.status(401).json({ errors: 'Old password is incorrect' });
      }
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
