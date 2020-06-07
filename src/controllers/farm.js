const Farm = require('../models/farm');

exports.create = async (req, res) => {
  const farm = new Farm({
    user: req.authorizer.id,
    farmName: req.body.farmName,
    postcode: req.body.postcode,
    contactName: req.body.contactName,
    contactNumber: req.body.contactNumber,
  });
  try {
    const data = await farm.save();
    res.status(201).json(data);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const farmNameError = err.errors.farmName ? err.errors.farmName.message : null;
      const postcodeError = err.errors.postcode ? err.errors.postcode.message : null;
      const contactNameError = err.errors.contactName ? err.errors.contactName.message : null;
      const contactNumberError = err.errors.contactNumber ? err.errors.contactNumber.message : null;

      res.status(400).json({
        errors: {
          farmName: farmNameError,
          postcode: postcodeError,
          contactName: contactNameError,
          contactNumber: contactNumberError,
        },
      });
    } else {
      res.sendStatus(500);
    }
  }
};

exports.list = async (req, res) => {
  const query = Farm.find();
  if (req.query.query) {
    const queryObj = JSON.parse(req.query.query);
    if (queryObj.searchString) {
      const regexQuery = { $regex: queryObj.searchString };
      query.or([{ farmName: regexQuery }, { postcode: regexQuery }, { contactName: regexQuery }]);
      // if (queryObj.contactName) {
      //   query.where('contactName').regex(queryObj.contactName);
      // } else if (queryObj.postcode) {
      //   query.where('postcode').regex(queryObj.postcode);
      // }
      // query = Farm.find({
      //   $or: [{ farmName: { $regex: queryObj.searchString } },
      //     { postcode: { $regex: queryObj.searchString } }],
      // });
    }
  }

  try {
    const farms = await query.exec();
    res.status(200).json(farms);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.find = (req, res) => {
  Farm.findById(req.params.farmId, (err, farm) => {
    if (!farm) {
      res.status(401).json({ error: 'Farm could not be found' });
    } else {
      res.status(200).json(farm);
    }
  });
};

exports.update = (req, res) => {
  Farm.findById(req.params.farmId, async (err, farm) => {
    if (!farm) {
      res.status(404).json({ error: 'Farm could not be found' });
    } else {
      console.log(farm);
      console.log(req.body);
      const updatedFarm = await farm.set(req.body).save();
      console.log(updatedFarm);
      res.status(200).json(updatedFarm);
    }
  });
};


exports.delete = (req, res) => {
  console.log(req.params.farmId);
  Farm.findByIdAndDelete(req.params.farmId, (err) => {
    if (err) {
      console.log(err);
      res.status(404).json({ error: 'Farm could not be found' });
    } else {
      res.sendStatus(200);
    }
  });
};
