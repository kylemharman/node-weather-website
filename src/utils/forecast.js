const request = require("request");

const forecast = (latitude, longitude, callback) => {
    // prettier-ignore
    const url = `https://api.darksky.net/forecast/97151b1401261ab56755894ba538159f/${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}?units=si`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service.", undefined);
        } else if (body.error) {
            callback("Unable to find location", undefined);
        } else {
            callback(
                undefined,
                `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees outside. There is a ${body.currently.precipIntensity}% chance of rain. Humidity will be ${body.currently.humidity}%`
            );
        }
    });
};

module.exports = forecast;
