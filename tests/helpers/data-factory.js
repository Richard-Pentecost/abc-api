const faker = require('faker');

exports.user = (options = {}) => ({
  firstName: options.firstName || faker.name.firstName(),
  lastName: options.lastName || faker.name.lastName(),
  email: options.email || faker.internet.email(),
  password: options.password || faker.internet.password(),
});

exports.farm = (options = {}) => ({
  farmName: options.farmName || faker.random.word(),
  postcode: options.postcode || faker.address.zipCode(),
  contactName: options.contactName || faker.name.findName(),
  contactNumber: options.contactNumber || faker.phone.phoneNumber(),
});

exports.data = (options = {}) => ({
  date: options.date || faker.date.recent(),
  product: options.product || faker.random.word(),
  quantity: options.quantity || faker.random.number(),
  meterReading: options.meterReading || faker.random.number(),
  initialFloat: options.initialFloat || faker.random.number(),
  waterUsage: options.waterUsage || faker.random.number(),
  pumpDial: options.pumpDial || faker.random.number(),
  float: options.float || faker.random.number(),
  reading: options.reading || faker.random.number(),
  comments: options.comments || faker.lorem.sentence(),
});
