const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: [true, 'A name must be provided'],
  },
  farmer: {
    type: String,
    required: [true, 'A farmer must be provided'],
  },
});

const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;
