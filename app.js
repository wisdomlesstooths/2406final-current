const express = require('express');

const app = express();

const client_routes = require('./client/routes/index');
// Routes that start with / will utilize routes from client_routes
app.use('/', client_routes);

const user_routes = require('./api/routes/user');

// When a route starts with 'user'
// use the routes stored within user_routes
app.use('/api/user', user_routes);

app.listen(3000, () => {
    console.log('Listening on port 3000 at http://localhost:3000');
})