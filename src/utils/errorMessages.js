
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
  const acidProductError = err.errors['acidData.product'] ? err.errors['acidData.product'].message : null;
  const acidQuantityError = err.errors['acidData.quantity'] ? err.errors['acidData.quantity'].message : null;
  const acidMeterReadingError = err.errors['acidData.meterReading'] ? err.errors['acidData.meterReading'].message : null;
  const acidInitialFloatError = err.errors['acidData.initialFloat'] ? err.errors['acidData.initialFloat'].message : null;
  const acidPumpDialError = err.errors['acidData.pumpDial'] ? err.errors['acidData.pumpDial'].message : null;
  const acidFloatError = err.errors['acidData.float'] ? err.errors['acidData.float'].message : null;
  const acidReadingError = err.errors['acidData.reading'] ? err.errors['acidData.reading'].message : null;
  const chlorineProductError = err.errors['chlorineData.product'] ? err.errors['chlorineData.product'].message : null;
  const chlorineQuantityError = err.errors['chlorineData.quantity'] ? err.errors['chlorineData.quantity'].message : null;
  const chlorineMeterReadingError = err.errors['chlorineData.meterReading'] ? err.errors['chlorineData.meterReading'].message : null;
  const chlorineInitialFloatError = err.errors['chlorineData.initialFloat'] ? err.errors['chlorineData.initialFloat'].message : null;
  const chlorinePumpDialError = err.errors['chlorineData.pumpDial'] ? err.errors['chlorineData.pumpDial'].message : null;
  const chlorineFloatError = err.errors['chlorineData.float'] ? err.errors['chlorineData.float'].message : null;
  const chlorineReadingError = err.errors['chlorineData.reading'] ? err.errors['chlorineData.reading'].message : null;

  const dataErrorObj = {
    date: dateError,
    acidProduct: acidProductError,
    acidQuantity: acidQuantityError,
    acidMeterReading: acidMeterReadingError,
    acidInitialFloat: acidInitialFloatError,
    acidPumpDial: acidPumpDialError,
    acidFloat: acidFloatError,
    acidReading: acidReadingError,
    chlorineProduct: chlorineProductError,
    chlorineQuantity: chlorineQuantityError,
    chlorineMeterReading: chlorineMeterReadingError,
    chlorineInitialFloat: chlorineInitialFloatError,
    chlorinePumpDial: chlorinePumpDialError,
    chlorineFloat: chlorineFloatError,
    chlorineReading: chlorineReadingError,
  };

  return dataErrorObj;
};

module.exports = { userErrorMessages, farmErrorMessages, dataErrorMessages };
