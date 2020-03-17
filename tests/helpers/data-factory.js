const faker = require('faker');

exports.user = (options = {}) => ({
  firstName: options.firstName || faker.name.firstName(),
  lastName: options.lastName || faker.name.lastName(),
  email: options.email || faker.internet.email(),
  password: options.password || faker.internet.password(),
});

exports.farm = (options = {}) => ({
  name: options.name || faker.random.word(),
  farmer: options.farmer || faker.name.findName(),
});
