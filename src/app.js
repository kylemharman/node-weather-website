const path = require('path'); // need to define paths to express
const express = require('express');
const hbs = require('hbs'); // needed to render partials with hbs.registerPartials()
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');


const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') // need this to setup handlebars
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Kyle Harman"
    }) // renders index.hbs 
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kyle Harman',
        image: "/img/kyle-harman-16-web.jpg"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Kyle Harman',
        message: 'Hello, what do you need help with?'
    })
})

app.get('/weather', (req, res) => {
    
    if (!req.query.address) {
        return res.send({
            error: 'No address provided! Please provide an address.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        });
    });

    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: '404 the help article your looking for does not exist',
        name: 'Kyle Harman'
    })
})

app.get('/products', (req, res) =>{
    
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    req.query

    res.send({
        products: []
    })
})

app.get('*', (req, res) => { // 404 need to come last 
    res.render('404', {
        title: '404',
        errorMessage: '404 the page your looking for does not exist',
        name: 'Kyle Harman'
    })
})

app.listen(port, () => {
    console.log('Sever is up on port.' + port)
});

