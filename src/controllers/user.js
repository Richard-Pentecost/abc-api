const User = require('../models/user');

exports.create = async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const data = await user.save();
    res.status(201).json(user.sanitise(data));
  } catch (err) {
    res.status(400).send(err.message);
  }
};
