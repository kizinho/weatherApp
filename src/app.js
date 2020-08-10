const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
//custom view directory
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup Handlebars engine and views location
app.set('view engine', 'hbs')
//express to use it
app.set('views', viewPath)
//partial for resuse
hbs.registerPartials(partialPath)


//Setup static directory to server
app.use(express.static(publicDirectoryPath))

//setup routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Adike kizito'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About us hbs',
        name: 'Adike kizito'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'This is help page',
        name: 'Adike kizito'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address was provided'
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
                location,
                address: req.query.address,
                latitude,
                longitude
            })

        })
    })


})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})



app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found',
        title: 'My error page',
        name: 'Adike kizito'
    })
})


//custom error
app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found',
        title: 'My error page',
        name: 'Adike kizito'
    })

})

//start server
app.listen(3000, () => {
    console.log('server is up on port 3000')
})