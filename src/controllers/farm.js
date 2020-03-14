const Farm = require('../models/farm');

exports.create = async (req, res) => {
  const { name, farmer } = req.body;

  try {
    const farm = new Farm({ name, farmer });
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
