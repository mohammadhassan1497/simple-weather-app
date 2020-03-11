const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = `https://api.darksky.net/forecast/5b22bc09997c9764499da2cbeca2e858/${latitude},${longitude}?units=si`

    request({ url, json: true }, (error, { body }) => {
        if (error)
            callback('Please enable network', undefined)
        else if (body.error)
            callback('Enable find loacation', undefined)
        else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + 'C degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast