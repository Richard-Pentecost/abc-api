
const farmNameFormat = (farmName) => {
  const formattedFarm = farmName.split('').map((char, index) => {
    if (index === 0 && isNaN(char)) {
      return char.toUpperCase();
    }
    if (farmName[index - 1] === ' ') {
      return char.toUpperCase();
    };
    return char;
  }).join('');
  return formattedFarm;
};

const postcodeFormat = (postcode) => {
  const len = postcode.length;
  const formattedPostcode = postcode.toUpperCase().split('');
  if (len === 6) {
    formattedPostcode.splice(3, 0, ' ');
  } else {
    formattedPostcode.splice(4, 0, ' ');
  }
  return formattedPostcode.join('');
};

const contactNameFormat = (contactName) => {
  const formattedContactName = contactName.split('').map((char, index) => {
    if (index === 0 || contactName[index - 1] === ' ') {
      return char.toUpperCase();
    }
    return char;
  }).join('');
  return formattedContactName;
};

const contactNumberFormat = (contactNumber) => {
  const formattedContactNumber = contactNumber.split('');
  formattedContactNumber.splice(5, 0, ' ');
  return formattedContactNumber.join('');
};

module.exports = {
  farmNameFormat,
  postcodeFormat,
  contactNameFormat,
  contactNumberFormat,
};
