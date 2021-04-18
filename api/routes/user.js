const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// GET /api/users/
router.get('/', async (req, res) => {
    let users = await User.find({});
    res.send(users);
})

// GET /api/users/:name
router.get('/:name', async (req, res) => {
    let username = req.params.name;
    // res.send(`Get User Profile of ${username}`);
    let user = await User.find({ name: username });
    res.send(user);
})


// Equivalent to createUser in index.js
// // POST /api/users
// router.post('/', (req, res) => {
//     let username = req.body.username;
//     let password = req.body.password;
//     res.send(`Created user with username: ${username} and password: ${password}`);
// })

// PUT /api/user/:username
router.put('/:username', (req, res) => {
    let username = req.params.username;
    let password = req.body.password;

    User.findOne({ name: username }, (err, user) => {
        if (err) {
            res.status(400).send('Error');
        } else if (user) {
            user.username = username;
            user.password = password;
            user.save((err) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send('saved');
                }
            })
        }
    })
})

// DELETE /api/user/:username 
router.delete('/:username', (req, res) => {
    let username = req.params.username;

    User.deleteOne({ name: username }, (err, user) => {
        if (err) throw err;
        if (user.deletedCount != 0) {
            console.log(user);
            res.send(`Deleted ${username}`);
        } else {
            res.send(`No user found with usename ${username}`);
        }
    })
})

module.exports = router;