const request = require('request');

const geocode = (location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoiamZhenppZSIsImEiOiJjanRrcTRxaTEwMmN1M3lxbHNnZnNkNjhsIn0.YvCiqhaliQJjNJNU6Pw6KQ`;

    request({
        json: true,
        url
    }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location service.');
        } else {
            const results = body.features;
            if (results.length > 0) {
                const [longitude, latitude] = results[0].center;
                callback(undefined, {
                    location: results[0].place_name,
                    longitude,
                    latitude
                });
            } else {
                callback('No results found.');
            }
        }
    });
};

module.exports = geocode;