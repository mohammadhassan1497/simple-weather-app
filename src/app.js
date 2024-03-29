const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 300
// define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// setup static direction to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mohammad Hassan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Mohammad Hassan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is same help text',
        title: 'Help',
        name: 'Mohammad Hassan'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide your location'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })

})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mohammad Hassan',
        error: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('server is work perfictly on port' + port)
})