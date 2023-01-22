

/**
 * 
 * @param {String} string 2022-12-30T17:00:00-05:00
 * @returns {Array} [year, monthIndex, day]
 */
module.exports.getDateFromString = (string) => {
  const dateString = string.split('T')[0];
  let dateArr = dateString.split('-');
  dateArr = dateArr.map(d => Number(d));
  dateArr[1] = dateArr[1] - 1;
  return dateArr;
}


/**
 * @param {String} a e.g. 2023-01-03T14:00:00.000Z
 * @param {String} b e.g. 2023-01-03T14:00:00.000Z
 * @returns {Number} of days btw date objects https://stackoverflow.com/a/15289883/914360
 */
module.exports.getDayDiff = (a, b) => {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const aArr = this.getDateFromString(a);
  const bArr = this.getDateFromString(b);
  const utc1 = Date.UTC(aArr[0], aArr[1], aArr[2]);
  const utc2 = Date.UTC(bArr[0], bArr[1], bArr[2]);
  const diff = Math.floor((utc2 - utc1) / MS_PER_DAY);
  return diff;
}

module.exports.getOneWordForecast = (forecast) => {
  try {
    const f = forecast.toLowerCase();
    if (f.includes('snow')) return 'snow';
    if (f.includes('sleet') || f.includes('freezing rain')) return 'sleet';
    if (f.includes('wind')) return 'wind';
    if (f.includes('rain')) return 'rain';
    if (f.includes('partly sunny') || f.includes('partly cloudy') || f.includes('partial sun') || f.includes('partial clouds')) return 'part-sun';
    if (f.includes('cloud')) return 'clouds';
    return 'sun';
  } catch (err) {
    return 'sun';
  }
}

module.exports.formatSimpleForecast = (periods, days = 2) => {
  const today = periods[0].startTime;
  const output = [];
  for (i = 0; i < days; i++) {
    const filteredPeriods = periods.filter((p) => {
      return this.getDayDiff(today, p.startTime) === i;
    });
    const day = filteredPeriods[0];
    const night = filteredPeriods[1] || day;
    const formattedPeriods = {
      hi: day.temperature,
      lo: night.temperature,
      forecast: this.getOneWordForecast(day.shortForecast)
    }
    output.push(formattedPeriods);
  }

  return output;
}
