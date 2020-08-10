const request = require('request')

const forecast = (latitude,longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=bd10e37eca54a73e04dffed624e0c2a5&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longtitude) + '&units=f'
    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather api', undefined)
        } else if (body.error) {
            callback('Unable to find Location', undefined)
        } else {
            const data = body.current
            callback(undefined, data.weather_descriptions[0] + ' . It is currently ' + data.temperature + ' out. It feels like ' + data.cloudcover + ' degress out'
            )
        }

    })

}

module.exports = forecast