const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  farmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farm',
    required: true,
  },
  data: {
    date: {
      type: Date,
      required: [true, 'A date must be provided'],
    },
    product: {
      type: String,
      required: [true, 'A product must be provided'],
    },
    quantity: Number,
    meterReading: {
      type: Number,
      required: [true, 'A meter reading must be provided'],
    },
    initialFloat: {
      type: Number,
      required: [true, 'An initial float must be provided'],
    },
    waterUsage: {
      type: Number,
      required: [true, 'A water usage value must be provided'],
    },
    pumpDial: {
      type: Number,
      required: [true, 'A pump dial setting must be provided'],
    },
    float: {
      type: Number,
      required: [true, 'A float must be provided'],
    },
    reading: {
      type: Number,
      required: [true, 'A reading must be provided'],
    },
    comments: String,
  },
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
