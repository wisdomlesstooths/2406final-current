const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Render Home Page');
})

router.get('/profile', (req, res) => {
    res.send('Render profile page');
})

router.get('/search', (req, res) => {
    res.send('Render search page');
})

router.get('/login', (req, res) => {
    res.send('Render Login page');
})

router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    console.log(`Login by ${username} with password ${password}`)

    res.send('Redirect after login');
})

router.get('/createUser', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    console.log(`Create user with ${username} and password ${password}`)

    res.send('Logged in after creating user');
})

router.get('/logout', (req, res) => {
    res.send('Render Logout page');
})

router.get('/contribute', (req, res) => {
    res.send('Render Contributer page');
})

module.exports = router;