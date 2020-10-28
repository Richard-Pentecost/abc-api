const mongoose = require('mongoose');
const {
  postcodeFormat,
  contactNameFormat,
  contactNumberFormat,
} = require('../utils/dataFormat');

const farmSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  farmName: {
    type: String,
    required: [true, 'A farm name must be provided'],
  },
  postcode: {
    type: String,
    required: [true, 'A postcode must be provided'],
  },
  contactName: {
    type: String,
    required: [true, 'A contact name must be provided'],
  },
  contactNumber: {
    type: String,
    required: [true, 'A contact number must be provided'],
  },
  deliveryMethod: {
    type: String,
    required: true,
  },
  accessCodes: String,
  comments: String,
  data: {
    lastVisit: Date,
    acidDeliveryDate: Date,
    chlorineDeliveryDate: Date,
  },
});

farmSchema.pre('save', function dataFormat(next) {
  this.postcode = postcodeFormat(this.postcode);
  this.contactName = contactNameFormat(this.contactName);
  this.contactNumber = contactNumberFormat(this.contactNumber);
  next();
});

const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;
