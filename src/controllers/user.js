const User = require('../models/user');

exports.create = async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  // user.save()
  //   .then(data => {
  //     console.log(data);
  //     res.status(201).send(data);
  //   })
  //   .catch(err => {
  //     res.status(400).send(err.message);
  //   });
  
  try {
    const data = await user.save();
    res.status(201).send(data);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
