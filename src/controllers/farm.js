const Farm = require('../models/farm');

exports.create = async (req, res) => {
  const farm = new Farm({
    user: req.authorizer.id,
    name: req.body.name,
    farmer: req.body.farmer,
  });

  try {
    const data = await farm.save();
    res.status(201).json(data);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const nameError = err.errors.name.message;
      res.status(400).json({
        errors: {
          name: nameError,
        },
      });
    } else {
      res.sendStatus(500);
    }
  }
};

exports.list = async (req, res) => {
  const query = Farm.find();

  if (req.query.farmer) {
    query.where('farmer').regex(req.query.farmer);
  } else if (req.query.name) {
    query.where('name').regex(req.query.name);
  }

  try {
    const farms = await query.exec();
    res.status(200).json(farms);
  } catch (err) {
    res.sendStatus(500);
  }
};
