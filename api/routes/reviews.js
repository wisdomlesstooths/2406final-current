const express = require('express');
const router = express.Router();

// GET /api/users/
router.get('/', (req, res) => {
    res.send('Get List Of Reviews');
})

// GET /api/users/:name
router.get('/:id', (req, res) => {
    const review_id = req.params.id;
    res.send(`Get Review with id ${review_id}`);
})

// POST /api/users
router.post('/', (req, res) => {
    let movie = req.body.movie;
    let summary = req.body.summary;
    let description = req.body.description;
    let rating = req.body.rating;

    res.send(`${movie}, ${summary}, ${description}, ${rating}`);
})

// PUT /api/user/:username
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let movie = req.body.movie;
    let summary = req.body.summary;
    let description = req.body.description;
    let rating = req.body.rating;

    res.send(`${id}, ${movie}, ${summary}, ${description}, ${rating}`);
})

// DELETE /api/user/:username 
router.delete('/:id', (req, res) => {
    let id = req.params.id;

    res.send(`Delete review with ${id}`);
})

module.exports = router;