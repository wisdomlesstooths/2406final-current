const express = require('express');
const router = express.Router();

// GET /api/movies
router.get('/', (req, res) => {
    res.send('Get List Of Movies');
})

// GET /api/movies/:title
router.get('/:title', (req, res) => {
    const title = req.params.title;
    res.send(`Get User Profile of ${title}`);
})

// POST /api/movies, create 
router.post('/', (req, res) => {
    let title = req.body.title;

    res.send(`Created movie with title: ${title}`);
})

// PUT /api/user/:username
router.put('/:title', (req, res) => {
    let title = req.body.title;

    res.send(`Updated user with title: ${title}`);
})

// DELETE /api/user/:username 
router.delete('/:title', (req, res) => {
    let title = req.params.title;

    res.send(`Deleted ${title}`);
})