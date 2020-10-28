const Data = require('../models/data');
const Farm = require('../models/farm');
const moment = require('moment');
const { dataErrorMessages } = require('../utils/errorMessages');
const { specGravFactor, deliveryDate } = require('../utils/dataCalculations');

exports.create = async (req, res) => {
  const acidFactor = specGravFactor(req.body.deliveryMethod, 'acid');
  const chlorineFactor = specGravFactor(req.body.deliveryMethod, 'chlorine');
  const acidProductKilos = req.body.acidData.float * acidFactor;
  const chlorineProductKilos = req.body.chlorineData.float * chlorineFactor;
  const {
    chlorineData,
    acidData,
    date,
    previousDate,
    previousAcidFloat,
    previousChlorineFloat,
    previousAcidDeliveryDate,
    previousChlorineDeliveryDate,
  } = req.body;
  let acidDeliveryDate = '';
  let chlorineDeliveryDate = '';
  if (previousDate) {
    acidDeliveryDate = deliveryDate(acidData, date, previousDate, previousAcidFloat, previousAcidDeliveryDate, acidFactor);
    chlorineDeliveryDate = deliveryDate(chlorineData, date, previousDate, previousChlorineFloat, previousChlorineDeliveryDate, chlorineFactor);
  }

  const newData = new Data({
    farmId: req.params.farmId,
    date: req.body.date,
    acidData: {
      product: req.body.acidData.product,
      quantity: req.body.acidData.quantity,
      meterReading: req.body.acidData.meterReading,
      initialFloat: req.body.acidData.initialFloat,
      pumpDial: req.body.acidData.pumpDial,
      float: req.body.acidData.float,
      reading: req.body.acidData.reading,
      kgActual: acidProductKilos.toFixed(2),
      deliveryDate: acidDeliveryDate,
      comments: req.body.acidData.comments,
    },
    chlorineData: {
      product: req.body.chlorineData.product,
      quantity: req.body.chlorineData.quantity,
      meterReading: req.body.chlorineData.meterReading,
      initialFloat: req.body.chlorineData.initialFloat,
      pumpDial: req.body.chlorineData.pumpDial,
      float: req.body.chlorineData.float,
      reading: req.body.chlorineData.reading,
      kgActual: chlorineProductKilos.toFixed(2),
      deliveryDate: chlorineDeliveryDate,
      comments: req.body.chlorineData.comments,
    },
  });

  const farm = await Farm.findById(req.params.farmId);

  if (farm) {
    try {
      const data = await newData.save();
      res.status(201).json(data);
    } catch (err) {
      if (err.name === 'ValidationError') {
        const errorObj = dataErrorMessages(err);
        res.status(401).json({ errors: errorObj });
      } else {
        res.sendStatus(500);
      }
    }
  } else {
    res.status(404).json({ error: 'This farm could not be found' });
  }
};

exports.list = (req, res) => {
  Farm.findById(req.params.farmId, (err, farm) => {
    if (!farm) {
      res.status(400).json({ error: 'Farm could not be found ' });
    } else {
      let query = Data.find({ farmId: req.params.farmId });

      if (req.query.records) {
        const queryObj = JSON.parse(req.query.records);
        const today = new Date(new Date(Date.now()).setHours(1, 0, 0));
        let startDate;
        switch (queryObj.searchString) {
          case '1 month':
            startDate = new Date(moment(today).subtract(1, 'months'));
            break;
          case '3 months':
            startDate = new Date(moment(today).subtract(3, 'months'));
            break;
          case '6 months':
            startDate = new Date(moment(today).subtract(6, 'months'));
            break;
          default:
            startDate = new Date(moment(today).subtract(1, 'year'));
            break;
        }
        query = query.where('date').gte(startDate);
      }

      query
        .sort({ date: -1 })
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

exports.update = async (req, res) => {
  const farm = await Farm.findById(req.params.farmId);
  if (!farm) {
    return res.status(400).json({ error: 'Farm could not be found' });
  }

  const data = await Data.findById(req.params.dataId);
  if (!data) {
    return res.status(400).json({ error: 'Data could not be found' });
  }

  const acidFactor = specGravFactor(req.body.deliveryMethod, 'acid');
  const chlorineFactor = specGravFactor(req.body.deliveryMethod, 'chlorine');
  const acidProductKilos = req.body.acidData.float * acidFactor;
  const chlorineProductKilos = req.body.chlorineData.float * chlorineFactor;
  const {
    chlorineData,
    acidData,
    date,
    previousDate,
    previousAcidFloat,
    previousChlorineFloat,
    previousAcidDeliveryDate,
    previousChlorineDeliveryDate,
  } = req.body;
  let acidDeliveryDate = '';
  let chlorineDeliveryDate = '';
  if (previousDate) {
    acidDeliveryDate = deliveryDate(acidData, date, previousDate, previousAcidFloat, previousAcidDeliveryDate, acidFactor);
    chlorineDeliveryDate = deliveryDate(chlorineData, date, previousDate, previousChlorineFloat, previousChlorineDeliveryDate, chlorineFactor);
  }
  const newData = {
    date: req.body.date,
    acidData: {
      product: req.body.acidData.product,
      quantity: req.body.acidData.quantity,
      meterReading: req.body.acidData.meterReading,
      initialFloat: req.body.acidData.initialFloat,
      pumpDial: req.body.acidData.pumpDial,
      float: req.body.acidData.float,
      reading: req.body.acidData.reading,
      kgActual: acidProductKilos.toFixed(2),
      deliveryDate: acidDeliveryDate,
      comments: req.body.acidData.comments,
    },
    chlorineData: {
      product: req.body.chlorineData.product,
      quantity: req.body.chlorineData.quantity,
      meterReading: req.body.chlorineData.meterReading,
      initialFloat: req.body.chlorineData.initialFloat,
      pumpDial: req.body.chlorineData.pumpDial,
      float: req.body.chlorineData.float,
      reading: req.body.chlorineData.reading,
      kgActual: chlorineProductKilos.toFixed(2),
      deliveryDate: chlorineDeliveryDate,
      comments: req.body.chlorineData.comments,
    },
  };

  try {
    const updatedData = await data.set(newData).save();
    res.status(200).json(updatedData);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errorObj = dataErrorMessages(err);
      res.status(401).json({ errors: errorObj });
    } else {
      res.sendStatus(500);
    }
  }
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
