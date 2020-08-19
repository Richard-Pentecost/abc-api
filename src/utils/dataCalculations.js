const moment = require('moment');

const specGravFactor = (deliveryMethod, product) => {
  switch (product) {
    case 'acid':
      if (deliveryMethod === 'tank') {
        return 2.85;
      }
      return 1.25;
    case 'chlorine':
      if (deliveryMethod === 'tank') {
        return 2.35;
      }
      return 1.03;
    default: return;
  }
};

const deliveryDate = (data, date, previousDate, previousFloat, factor) => {
  const previousKilos = previousFloat * factor;
  const initialKilos = data.initialFloat * factor;
  const finalKilos = data.float * factor;
  const days = moment(date).diff(moment(previousDate), 'days');

  const usedKilos = previousKilos - initialKilos;
  const kilosPerDay = usedKilos / days;
  const daysLeft = Math.floor(finalKilos / kilosPerDay);

  const nextDeliveryDate = new Date(moment(date).add(daysLeft, 'days'));
  return nextDeliveryDate;
};

module.exports = { specGravFactor, deliveryDate };
