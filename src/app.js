const express = require('express');
const hbs = require('hbs');
const path = require('path');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'John',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'John',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'How to use',
        name: 'John',
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.code = 400;
        return res.send({error: 'No address specified.'})
    }

    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(longitude, latitude, (error, data) => {
            if (error) {
                return res.send({ error });
            }

            return res.send({
                location,
                ...data
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        message: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        message: 'My 404 page'
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
