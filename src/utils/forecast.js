const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = `https://api.darksky.net/forecast/d70dfdd4c243073ca534e01a8d800449/${latitude},${longitude}`;

    request({
        json: true,
        url
    }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service');
        } else if (body.error) {
            callback(body.error);
        } else {
            const currently = body.currently;
            const summary = body.daily.data[0].summary;
            const forecast = `It is currently ${currently.temperature} degrees out. ` +
                `There is a ${currently.precipProbability * 100}% chance of rain.`;
            callback(undefined, { summary, forecast })
        }
    });
};

module.exports = forecast;