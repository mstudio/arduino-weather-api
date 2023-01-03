# arduino-weather-api
Node/Lambda based app which makes calls to National Weather service and simplifies responses to optimize data for Arduino processing


## Data source

Docs:

https://www.weather.gov/documentation/services-web-api

API Cal for NY:
  
https://api.weather.gov/gridpoints/ALY/52,15/forecast


## Lambda endpoint

https://56gikm5okc.execute-api.us-east-1.amazonaws.com/production/simple-forecast?office=ALY&gridX=52&gridY=15

## Cloudfront

The Arduino Ethernet Lib/Shield does not support TLS (HTTPS). As a workaround, Cloudfront is used as a proxy since it allows HTTP-only:
https://d2boyfgp9fovjg.cloudfront.net/production/simple-forecast?office=ALY&gridX=52&gridY=15


## Development

```
npm i
npm run dev
```

View in http://localhost:8000/simple-forecast?office=ALY&gridX=52&gridY=15

## Deployment to Lambda

Ensure that aws-cli is installed along with your API key and secret

```
npm run deploy
```
