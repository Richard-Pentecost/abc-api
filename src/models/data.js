const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  farmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farm',
    required: true,
  },
  date: {
    type: Date,
    validate: [date => date <= Date.now(), 'Can\'t input a future date'],
    required: [true, 'A date must be provided'],
  },
  acidData: {
    product: {
      type: String,
      required: [true, 'A product must be provided'],
    },
    quantity: {
      type: Number,
      validate: [i => i > 0, 'Quantity must be a positive number'],
      required: [true, 'A quantity value must be provided'],
    },
    meterReading: {
      type: Number,
      validate: [i => i > 0, 'Meter reading must be a positive number'],
      required: [true, 'A meter reading value must be provided'],
    },
    initialFloat: {
      type: Number,
      validate: [i => i > 0, 'Float before delivery must be a positive number'],
      required: [true, 'A float before delivery value must be provided'],
    },
    // waterUsage: {
    //   type: Number,
    //   validate: [i => i > 0, 'Water usage must be a positive number'],
    //   required: [true, 'A water usage value must be provided'],
    // },
    pumpDial: {
      type: Number,
      validate: [i => i > 0, 'Pump dial setting must be a positive number'],
      required: [true, 'A pump dial setting must be provided'],
    },
    float: {
      type: Number,
      validate: [i => i > 0, 'Float must be a positive number'],
      required: [true, 'A float value must be provided'],
    },
    reading: {
      type: Number,
      validate: [i => i > 0, 'The reading must be a positive number'],
      required: [true, 'The reading value must be provided'],
    },
    comments: String,
  },
  chlorineData: {
    product: {
      type: String,
      required: [true, 'A product must be provided'],
    },
    quantity: {
      type: Number,
      validate: [i => i > 0, 'Quantity must be a positive number'],
      required: [true, 'A quantity value must be provided'],
    },
    meterReading: {
      type: Number,
      validate: [i => i > 0, 'Meter reading must be a positive number'],
      required: [true, 'A meter reading value must be provided'],
    },
    initialFloat: {
      type: Number,
      validate: [i => i > 0, 'Float before delivery must be a positive number'],
      required: [true, 'A float before delivery value must be provided'],
    },
    // waterUsage: {
    //   type: Number,
    //   validate: [i => i > 0, 'Water usage must be a positive number'],
    //   required: [true, 'A water usage value must be provided'],
    // },
    pumpDial: {
      type: Number,
      validate: [i => i > 0, 'Pump dial setting must be a positive number'],
      required: [true, 'A pump dial setting must be provided'],
    },
    float: {
      type: Number,
      validate: [i => i > 0, 'Float must be a positive number'],
      required: [true, 'A float value must be provided'],
    },
    reading: {
      type: Number,
      validate: [i => i > 0, 'The reading must be a positive number'],
      required: [true, 'The reading value must be provided'],
    },
    comments: String,
  },
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
