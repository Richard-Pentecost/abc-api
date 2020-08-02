const mongoose = require('mongoose');

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
});

farmSchema.pre('save', function dataFormat(next) {
  this.farmName = this.farmName.toLowerCase();
  this.postcode = this.postcode.toLowerCase().split('').filter(c => c !== ' ').join('');
  this.contactName = this.contactName.toLowerCase();
  this.contactNumber = this.contactNumber.split('').filter(i => i !== ' ').join('');
  next();
});

const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;
