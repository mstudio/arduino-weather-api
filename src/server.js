const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const app = express();
const { formatSimpleForecast } = require('./utils');

const port = process.env.PORT || 8000;
const NWS_API_URL = "https://api.weather.gov/gridpoints"


/**
 * GET a simple JSON  forecast. Each day has: hi, lo (in F), and forecast, e.g. "Partly Cloudy"
 */
app.get('/simple-forecast', async (req, res, next) => {
  const { office, gridX, gridY } = req.query;

  // Get Data From NWS
  try {
    const url = `${NWS_API_URL}/${office}/${gridX},${gridY}/forecast`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.status && data.status >= 400) {
      throw new Error(data.detail || 'Uknown error.');
    }
    const forecast = formatSimpleForecast(data.properties.periods);
    res.send({ data: forecast });
  } catch (err) {
    res.send({
      "error": {
        "code": 400,
        "message": err.message
      }
    })
  }
});

/**np
 * GET full forecast, in F
 */
app.get('/forecast', async (req, res, next) => {
  const { office, gridX, gridY } = req.query;

  // Get Data From NWS
  try {
    const url = `${NWS_API_URL}/${office}/${gridX},${gridY}/forecast`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.status && data.status >= 400) {
      throw new Error(data.detail || 'Uknown error.');
    }
    res.send({ data });
  } catch (err) {
    res.send({
      "error": {
        "code": 400,
        "message": err.message
      }
    })
  }
});

// Server
app.listen(port, () => {
  console.log(`Listening on: http://localhost:${port}`);
});
