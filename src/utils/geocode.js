const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibW9oYW1tYWRoYXNzYW4iLCJhIjoiY2syNG9lbHV6MWM1ODNsbnl2aWRtbWI4YSJ9._WxnyAnmX3YzppS70ZeEjw`

    request({ url, json: true }, (error, { body }) => {
        if (error)
            callback('Please enable network', undefined)
        else if (body.features.length === 0)
            callback('Samething worng', undefined)
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
