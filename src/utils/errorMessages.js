
const userErrorMessages = (err) => {
  const nameError = err.errors.name ? err.errors.name.message : null;
  const usernameError = err.errors.username ? err.errors.username.message : null;
  const emailError = err.errors.email ? err.errors.email.message : null;
  const passwordError = err.errors.password ? err.errors.password.message : null;

  const userErrorObj = {
    name: nameError,
    username: usernameError,
    email: emailError,
    password: passwordError,
  };

  return userErrorObj;
};

const farmErrorMessages = (err) => {
  const farmNameError = err.errors.farmName ? err.errors.farmName.message : null;
  const postcodeError = err.errors.postcode ? err.errors.postcode.message : null;
  const contactNameError = err.errors.contactName ? err.errors.contactName.message : null;
  const contactNumberError = err.errors.contactNumber ? err.errors.contactNumber.message : null;

  const farmErrorObj = {
    farmName: farmNameError,
    postcode: postcodeError,
    contactName: contactNameError,
    contactNumber: contactNumberError,
  };

  return farmErrorObj;
};

const dataErrorMessages = (err) => {
  const dateError = err.errors.date ? err.errors.date.message : null;
  const productError = err.errors.product ? err.errors.product.message : null;
  const quantityError = err.errors.quantity ? err.errors.quantity.message : null;
  const meterReadingError = err.errors.meterReading ? err.errors.meterReading.message : null;
  const initialFloatError = err.errors.initialFloat ? err.errors.initialFloat.message : null;
  const waterUsageError = err.errors.waterUsage ? err.errors.waterUsage.message : null;
  const pumpDialError = err.errors.pumpDial ? err.errors.pumpDial.message : null;
  const floatError = err.errors.float ? err.errors.float.message : null;
  const readingError = err.errors.reading ? err.errors.reading.message : null;

  const dataErrorObj = {
    date: dateError,
    product: productError,
    quantity: quantityError,
    meterReading: meterReadingError,
    initialFloat: initialFloatError,
    waterUsage: waterUsageError,
    pumpDial: pumpDialError,
    float: floatError,
    reading: readingError,
  };

  return dataErrorObj;
};

module.exports = { userErrorMessages, farmErrorMessages, dataErrorMessages };
