const express = require('express');
const router = express.Router();
const User = require('../../models/User');

router.post('/createUser', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let newUser = new User({ name: username, 
                            password: password,
                            loggedIn: true,
                            contributing: false
                        });

    newUser.save((err) => {
        if (err) {
             res.send('Error occurred');
             return;
        }

        req.session.loggedIn = true;
        req.session.user = newUser;

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
                
                req.session.loggedIn = true;
                req.session.user = user;

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

router.get('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.loggedIn = false;
        req.session.user = null;
        res.send('You are now logged out');
    } else {
        res.send('ERROR 400: You are not logged in.');
    }
})
module.exports = router;
