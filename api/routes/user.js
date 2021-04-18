const express = require('express');
const router = express.Router();

// GET /api/users/
router.get('/', (req, res) => {
    res.send('Get List Of Users');
})

// GET /api/users/:name
router.get('/:name', (req, res) => {
    const username = req.params.name;
    res.send(`Get User Profile of ${username}`);
})

// POST /api/users
router.post('/', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    res.send(`Created user with username: ${username} and password: ${password}`);
})

// PUT /api/user/:username
router.put('/:username', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    res.send(`Updated user with username: ${username} and password: ${password}`);
})

// DELETE /api/user/:username 
router.delete('/:username', (req, res) => {
    let username = req.params.username;

    res.send(`Deleted ${username}`);
})

module.exports = router;