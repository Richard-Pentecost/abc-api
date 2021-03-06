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
      required: [true, 'An acid product must be provided'],
    },
    quantity: {
      type: Number,
      validate: [i => i >= 0, 'The acid quantity can\'t be a negative number'],
      required: [true, 'An acid quantity value must be provided'],
    },
    meterReading: {
      type: Number,
      validate: [i => i > 0, 'The acid meter reading must be a positive number'],
      required: [true, 'An acid meter reading value must be provided'],
    },
    initialFloat: {
      type: Number,
      validate: [i => i >= 0, 'The acid float before delivery can\'t be a negative number'],
      required: [true, 'An acid float before delivery value must be provided'],
    },
    pumpDial: {
      type: Number,
      validate: [i => i > 0, 'The acid pump dial setting must be a positive number'],
      required: [true, 'An acid pump dial setting must be provided'],
    },
    float: {
      type: Number,
      validate: [i => i >= 0, 'The acid float can\'t be a negative number'],
      required: [true, 'An acid float value must be provided'],
    },
    reading: {
      type: String,
      required: [true, 'An acid reading must be provided'],
    },
    kgActual: Number,
    deliveryDate: Date,
    comments: String,
  },
  chlorineData: {
    product: {
      type: String,
      required: [true, 'A chlorine product must be provided'],
    },
    quantity: {
      type: Number,
      validate: [i => i >= 0, 'The chlorine quantity can\'t be a negative number'],
      required: [true, 'A chlorine quantity value must be provided'],
    },
    meterReading: {
      type: Number,
      validate: [i => i > 0, 'The chlorine meter reading must be a positive number'],
      required: [true, 'A chlorine meter reading value must be provided'],
    },
    initialFloat: {
      type: Number,
      validate: [i => i >= 0, 'The chlorine float before delivery can\'t be a negative number'],
      required: [true, 'A chlorine float before delivery value must be provided'],
    },
    pumpDial: {
      type: Number,
      validate: [i => i > 0, 'The chloirne pump dial setting must be a positive number'],
      required: [true, 'A chlorine pump dial setting must be provided'],
    },
    float: {
      type: Number,
      validate: [i => i >= 0, 'The chlorine float can\'t be a negative number'],
      required: [true, 'A chlorine float value must be provided'],
    },
    reading: {
      type: String,
      required: [true, 'A chlorine reading must be provided'],
    },
    kgActual: Number,
    deliveryDate: Date,
    comments: String,
  },
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
