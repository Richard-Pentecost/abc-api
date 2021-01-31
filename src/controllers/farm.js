const Farm = require('../models/farm');
const Data = require('../models/data');
const { farmErrorMessages } = require('../utils/errorMessages');

exports.create = async (req, res) => {
  const farm = new Farm({
    user: req.authorizer.id,
    farmName: req.body.farmName,
    postcode: req.body.postcode,
    contactName: req.body.contactName,
    contactNumber: req.body.contactNumber,
    deliveryMethod: req.body.deliveryMethod,
    accessCodes: req.body.accessCodes,
    comments: req.body.comments,
  });
  try {
    const data = await farm.save();
    res.status(201).json(data);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errorObj = farmErrorMessages(err);
      res.status(404).json({ errors: errorObj });
    } else {
      res.sendStatus(500);
    }
  }
};

exports.listAll = async (req, res) => {
  try {
    const farms = await Farm.find({}).sort('farmName');
    if (!farms) {
      res.status(401).json({ error: "Couldn't find farms" });
    }
    res.status(201).json(farms);
  } catch (err) {
    res.status(401).json({ error: 'Error with database' });
  }
};

exports.list = async (req, res) => {
  const query = Farm.find({ status: 1 });
  if (req.query.query) {
    const queryObj = JSON.parse(req.query.query);
    if (queryObj.searchString) {
      const regexQuery = { $regex: queryObj.searchString, $options: 'i' };
      query.or([{ farmName: regexQuery }, { postcode: regexQuery }, { contactName: regexQuery }]);
    }
  }

  if (req.query.sort) {
    const sortParams = JSON.parse(req.query.sort);
    let field = `data.${sortParams}`;
    if (sortParams.includes('-')) {
      field = `-data.${sortParams.substring(1)}`;
    }
    query.sort(field);
  }

  try {
    const farms = await query.sort('farmName').exec();
    res.status(200).json(farms);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.update = (req, res) => {
  Farm.findById(req.params.farmId, async (error, farm) => {
    if (!farm) {
      res.status(404).json({ error: 'Farm could not be found' });
    } else {
      try {
        const data = await farm.set(req.body).save();
        res.status(201).json(data);
      } catch (err) {
        if (err.name === 'ValidationError') {
          const errorObj = farmErrorMessages(err);
          res.status(404).json({ errors: errorObj });
        } else {
          res.sendStatus(500);
        }
      }
    }
  });
};


exports.delete = (req, res) => {
  Farm.findByIdAndDelete(req.params.farmId, (err) => {
    if (err) {
      res.status(404).json({ error: 'Farm could not be found' });
    } else {
      Data.deleteMany({ farmId: req.params.farmId });
      res.sendStatus(200);
    }
  });
};
