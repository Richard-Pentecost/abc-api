const Data = require('../models/data');
const Farm = require('../models/farm');

exports.create = async (req, res) => {
  const newData = new Data({
    userId: req.authorizer.id,
    farmId: req.params.farmId,
    data: {
      date: req.body.date,
      product: req.body.product,
      quantity: req.body.quantity,
      meterReading: req.body.meterReading,
      initialFloat: req.body.initialFloat,
      waterUsage: req.body.waterUsage,
      pumpDial: req.body.pumpDial,
      float: req.body.float,
      reading: req.body.reading,
      comments: req.body.comments,
    },
  });
  // console.log(['New Data'], newData);

  Farm.findById(req.params.farmId, (err, farm) => {
    if (!farm) {
      res.status(404).json({ error: 'This farm could not be found.' });
    } else {
      newData.save()
        .then(response => {
          // console.log(response);
          res.status(201).json(response);
        })
        .catch(error => {
          console.log('save error', error);
        });
    }
  });
};

exports.list = (req, res) => {
  Farm.findById(req.params.farmId, (err, farm) => {
    if (!farm) {
      res.status(400).json({ error: 'Farm could not be found ' });
    } else {
      Data.find({ farmId: req.params.farmId })
        .exec((e, data) => {
          if (!data) {
            res.status(400).json({ error: 'Data could not be found' });
          } else {
            res.status(200).json(data);
          }
        });
    }
  });
};

exports.update = (req, res) => {
  Farm.findById(req.params.farmId, (err, farm) => {
    if (!farm) {
      res.status(400).json({ error: 'Farm could not be found' });
    } else {
      Data.findById(req.params.dataId, async (error, data) => {
        if (!data) {
          res.status(400).json({ error: 'Data could not be found' });
        } else {
          const updatedData = await data.set({ data: req.body }).save();
          res.status(200).json(updatedData);
        }
      });
    }
  });
};


exports.delete = (req, res) => {
  Data.findByIdAndDelete(req.params.dataId, (err) => {
    if (err) {
      res.status(404).json({ error: 'Data could not be found' });
    } else {
      res.sendStatus(200);
    }
  });
};
