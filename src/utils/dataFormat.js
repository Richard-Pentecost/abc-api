const postcodeFormat = (postcode) => {
  const len = postcode.length;
  const formattedPostcode = postcode.toUpperCase().split('').filter(c => c !== ' ');
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
  const number = contactNumber.split('').filter(i => i !== ' ').join('');
  return number.includes('/') ? number.split('/').join(' / ') : number;
};

module.exports = {
  postcodeFormat,
  contactNameFormat,
  contactNumberFormat,
};
