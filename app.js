const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://hello:world@cluster0.j2hgm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const app = express();

app.set('views', __dirname + '/client/views');
app.set('view engine', 'pug');

// express session stuff for current logged-in user
const expressSession = require('express-session');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(expressSession({ secret: 'this is my random secret key because security'}));

// Route Stuff // 
const client_routes = require('./client/routes/index');
// Routes that start with / will utilize routes from client_routes
app.use('/', client_routes);

const api_routes = require('./api/routes/index');
const user_routes = require('./api/routes/user');
//const users_routes = require('./client/routes/users');
const movie_routes = require('./api/routes/movie');
const people_routes = require('./api/routes/people');
const review_routes = require('./api/routes/reviews');

// When a route starts with 'user'
// use the routes stored within user_routes
app.use('/api', api_routes);
app.use('/api/users', user_routes);
app.use('/api/movies', movie_routes);
app.use('/api/people', people_routes);
app.use('/api/reviews', review_routes);
//app.use('/users', users_routes);

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected');
})

mongoose.connection.on('error', () => {
    console.log('Mongoose connectino error');
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
})

app.listen(3000, () => {
    console.log('Listening on port 3000 at http://localhost:3000');
})