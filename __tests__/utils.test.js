
const { getOneWordForecast } = require('../src/utils');

describe('Testing weather utils...', () => {

    test('Clouds and freezing rain', () => {
        expect(getOneWordForecast('Clouds and freezing rain')).toBe(
            'sleet'
        );
    });

    test('Partly sunny', () => {
        expect(getOneWordForecast('Partly sunny')).toBe(
            'part-sun'
        );
    });

    test('clouds and then partial sunshine', () => {
        expect(getOneWordForecast('clouds and then partial sunshine')).toBe(
            'part-sun'
        );
    });

    test('rain and then partial sunshine', () => {
        expect(getOneWordForecast('rain and then partial sunshine')).toBe(
            'rain'
        );
    });

    test('Rain and Wind then sun', () => {
        expect(getOneWordForecast('Rain and Wind then sun')).toBe(
            'wind'
        );
    });

    test('Chance Snow then Mostly Sunny', () => {
        expect(getOneWordForecast('Chance Snow then Mostly Sunny')).toBe(
            'snow'
        );
    });

    test('Chance Rain And Snow', () => {
        expect(getOneWordForecast('Chance Rain And Snow')).toBe(
            'snow'
        );
    });

    test('Rain then Sleet', () => {
        expect(getOneWordForecast('Rain then Sleet')).toBe(
            'sleet'
        );
    });

    test('Mostly Cloudy then Rain And Snow Likely', () => {
        expect(getOneWordForecast('Mostly Cloudy then Rain And Snow Likely')).toBe(
            'snow'
        );
    });

    test('Mostly Cloudy', () => {
        expect(getOneWordForecast('Mostly Cloudy')).toBe(
            'clouds'
        );
    });

    test('Sunny', () => {
        expect(getOneWordForecast('Sunny')).toBe(
            'sun'
        );
    });
    test('Mostly Clear', () => {
        expect(getOneWordForecast('Mostly Clear')).toBe(
            'sun'
        );
    });

    test('bla blba', () => {
        expect(getOneWordForecast('bla blba')).toBe(
            'sun'
        );
    });

    test('Null test', () => {
        expect(getOneWordForecast(null)).toBe(
            'sun'
        );
    });
});