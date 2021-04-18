const express = require('express');
const router = express.Router();
const User = require('../../models/User');

let loggedIn = false;

router.get('/', (req, res) => {
    //res.send('Render Home Page');
  	res.render('pages/home', {
		title: 'Home',
        loggedIn: loggedIn
	});
})

router.get('/profile', (req, res) => {
    res.send('Render profile page');
})

router.get('/search', (req, res) => {
    res.render('pages/search', {
		title: 'Search',
        loggedIn: loggedIn
	});
})

router.get('/login', (req, res) => {
    res.render('pages/login', {
		title: 'Login',
        loggedIn: loggedIn
	});
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
                        loggedIn = true;
                        res.redirect('/');
                    }
                })
            } else {
                res.status(400).send('Invalid password');
            }
        }
    })
})


router.get('/createUser', (req, res) => {
    res.render('pages/createUser', {
		title: 'Create User',
        loggedIn: loggedIn
	});
})

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
        loggedIn = true;
        res.redirect('/');
    })
})

router.get('/logout', (req, res) => {
    loggedIn = false;
    res.redirect('/');
})

router.get('/contribute', (req, res) => {
    res.send('Render Contributer page');
})

module.exports = router;