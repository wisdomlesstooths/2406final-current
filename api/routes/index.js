const express = require('express');
const router = express.Router();
const User = require('../../models/User');

router.post('/createUser', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let newUser = new User({ name: username, 
                            password: password,
                            loggedIn: false,
                            contributing: false
                        });

    newUser.save((err) => {
        if (err) {
             res.send('Error occurred');
             return;
        }
        res.send('New User Created');
    })
})

router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (!username || !password) {
        res.status(400);
        res.send('Invalid Credentials');
    }

    User.findOne({ name: username }, (err, user) => {
        if (err) {
            res.status(400).send('Error');
        } else if (user) {
            if (user.password == password) {
                user.loggedIn = true;
                user.save((err) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send('saved');
                    }
                })
            } else {
                res.status(400).send('Invalid password');
            }
        }
    })
})

module.exports = router;
