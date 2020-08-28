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

const deliveryDate = (data, date, previousDate, previousFloat, previousDeliveryDate, factor) => {
  const days = moment(date).diff(moment(previousDate), 'days');
  let nextDeliveryDate;
  const formattedInitialFloat = Number(data.initialFloat);
  if (previousFloat === formattedInitialFloat) {
    nextDeliveryDate = new Date(moment(previousDeliveryDate).add(days, 'days'));
  } else {
    const previousKilos = previousFloat * factor;
    const initialKilos = data.initialFloat * factor;
    const finalKilos = data.float * factor;
    const usedKilos = previousKilos - initialKilos;
    const kilosPerDay = usedKilos / days;
    const daysLeft = Math.floor(finalKilos / kilosPerDay);
    nextDeliveryDate = new Date(moment(date).add(daysLeft, 'days'));
  }
  return nextDeliveryDate;
};

module.exports = { specGravFactor, deliveryDate };
