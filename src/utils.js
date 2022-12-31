

/**
 * 
 * @param {String} string 2022-12-30T17:00:00-05:00
 * @returns {Date} Thu Dec 29 2022 19:00:00 GMT-0500 (Eastern Standard Time)
 */
module.exports.getDateFromString = (string) => {
  const dateString = string.split('T')[0];
  const date = new Date(dateString);
  return date;
}


/**
 * @param {Date} a 
 * @param {Date} b 
 * @returns {Number} of days btw date objects https://stackoverflow.com/a/15289883/914360
 */
module.exports.getDayDiff = (a, b) => {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utc2 - utc1) / MS_PER_DAY);
}

module.exports.formatSimpleForecast = (periods, days = 4) => {
  const today = new Date(periods[0].startTime);
  const output = [];
  for (i = 0; i < days; i++) {
    const filteredPeriods = periods.filter((p) => this.getDayDiff(today, new Date(p.startTime)) === i);
    const day = filteredPeriods[0];
    const night = filteredPeriods[1] || day;
    const formattedPeriods = {
      hi: day.temperature,
      lo: night.temperature,
      forecast: day.shortForecast
    }
    output.push(formattedPeriods);
  }

  return output;
}
