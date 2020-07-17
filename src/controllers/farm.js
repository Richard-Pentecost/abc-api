const Farm = require('../models/farm');
const Data = require('../models/data');
const {
  farmNameFormat,
  postcodeFormat,
  contactNameFormat,
  contactNumberFormat,
} = require('../utils/dataFormat');

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
      console.log(err);
      res.sendStatus(500);
    }
  }
};

exports.list = async (req, res) => {
  const query = Farm.find();
  if (req.query.query) {
    const queryObj = JSON.parse(req.query.query);
    if (queryObj.searchString) {
      const regexQuery = { $regex: queryObj.searchString.toLowerCase() };
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
    farms.map(farm => {
      farm.farmName = farmNameFormat(farm.farmName);  
      farm.postcode = postcodeFormat(farm.postcode);
      farm.contactName = contactNameFormat(farm.contactName);
      farm.contactNumber = contactNumberFormat(farm.contactNumber);
      return farm;
    });
    res.status(200).json(farms);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

// exports.find = (req, res) => {
//   console.log('[Find]');
//   Farm.findById(req.params.farmId, (err, farm) => {
//     if (!farm) {
//       res.status(401).json({ error: 'Farm could not be found' });
//     } else {
//       res.status(200).json(farm);
//     }
//   });
// };

exports.update = (req, res) => {
  Farm.findById(req.params.farmId, async (err, farm) => {
    if (!farm) {
      res.status(404).json({ error: 'Farm could not be found' });
    } else {
      const updatedFarm = await farm.set(req.body).save();
      res.status(200).json(updatedFarm);
    }
  });
};


exports.delete = (req, res) => {
  Farm.findByIdAndDelete(req.params.farmId, (err) => {
    if (err) {
      res.status(404).json({ error: 'Farm could not be found' });
    } else {
      Data.deleteMany({ farmId: req.params.farmId }, (error) => {
        console.log(error);
      });
      res.sendStatus(200);
    }
  });
};
