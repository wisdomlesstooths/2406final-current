const express = require('express');
const bodyParser = require('body-parser').json();
//const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost/test';


const app = express();

// Middleware
app.use(bodyParser);

// Route Stuff // 
const client_routes = require('./client/routes/index');
// Routes that start with / will utilize routes from client_routes
app.use('/', client_routes);

const api_routes = require('./api/routes/index');
const user_routes = require('./api/routes/user');
const movie_routes = require('./api/routes/movie');

// When a route starts with 'user'
// use the routes stored within user_routes
app.use('/api', api_routes);
app.use('/api/users', user_routes);
app.use('/api/movies', movie_routes);

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