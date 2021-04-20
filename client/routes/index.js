const express = require('express');
const router = express.Router();
const User = require('../../models/User');

let loggedIn = false;

router.get('/', (req, res) => {
    //res.send('Render Home Page');
  	res.render('pages/home', {
		title: 'Home',
        loggedIn: req.session.loggedIn
	});
})

router.get('/profile', async (req, res) => {
    if (!req.session.user) {
        res.status(400).send('ERROR 400: Please log in/create an account before trying to see your profile');
    }
    else {
      let u = await User.findOne({name: req.session.user.name}).catch(e => {res.status(400).send('ERROR 400');});
      res.render('pages/profile', {
            title: req.session.user.name,
            loggedIn: true,
            user: u
          })


      /*
        res.render('pages/profile', {
            title: req.session.user.name,
            loggedIn: req.session.loggedIn,
            user: req.session.user
        });*/
    }
})

router.post('/profile', (req, res) => {
    User.findOne({ name: req.session.user.name }, (err, user) => {
        if (err) {
            res.status(400).send('Error');
        } else if (user) {

            if (req.body.contributing == 1) {
                req.session.user.contributing = true;
                user.contributing = true;
            }
            else if (req.body.contributing == 0) {
                req.session.user.contributing = false;
                user.contributing = false;
            }
            console.log(req.session.user.contributing);
            console.log(user.contributing);

            user.save((err) => {
                if (err) {
                    res.send('Error occurred');
                    return;
                }
                res.render('pages/profile', {
                    title: req.session.user.name,
                    loggedIn: req.session.loggedIn,
                    user: req.session.user
                });
            })
        }
    })

    // req.session.user.update({$set: (err) => {
    //     if (err) {
    //          res.send('Error occurred');
    //          return;
    //     }
    //     res.render('pages/profile', {
    //         title: req.session.user.name,
    //         loggedIn: req.session.loggedIn,
    //         user: req.session.user
    //     });
    // }})
})

router.get('/search', (req, res) => {
    res.render('pages/search', {
		title: 'Search',
        loggedIn: req.session.loggedIn
	});
})

router.get('/login', (req, res) => {
    res.render('pages/login', {
		title: 'Login',
        loggedIn: req.session.loggedIn
	});
})

router.post('/login', (req, res) => {
//       let person = req.params.name;
//   if (!Person.exists({name: person})){}
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
                //user.loggedIn = true;
                user.save((err) => {
                    if (err) {
                        res.send(err);
                    } else {
                        req.session.loggedIn = true;
                        req.session.user = user;
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
        loggedIn: req.session.loggedIn
	});
})

router.post('/createUser', async (req, res) => {
    // let username = req.body.username;
    // let password = req.body.password;

    // let newUser = new User({ name: username,
    //                         password: password,
    //                         loggedIn: true,
    //                         contributing: false
    //                     });

    // newUser.save((err) => {
    //     if (err) {
    //          res.send('Error occurred');
    //          return;
    //     }

    //     req.session.loggedIn = true;
    //     req.session.user = newUser;

    //     res.redirect('/');
    // })

    if (req.body.username && req.body.password && !User.exists({name: req.body.username})){
        await User.create({
          name: req.body.username,
          password: req.body.password,
          loggedIn: true,
          contributing: false,
          recommendedMovies: [],
          watchedMovies: [],
          usersFollowing: [],
          peopleFollowing: [],
          reviews: []
        }).then(u => {
            req.session.user = u;
            req.session.loggedIn = true;
            res.redirect('/profile');
        }).catch(e => {res.status(400).send('ERROR 400: Username taken');})
    }
    else {
    res.status(400).send('ERROR 400');
    }
})

router.get('/logout', (req, res) => {
    req.session.loggedIn = false;
    req.session.user = null;

    res.redirect('/');
})

router.get('/contribute', (req, res) => {
    if (!req.session.user) {
        res.status(400).send('ERROR 400: Please log in/create an account before trying to contribute');
    } else if (!req.session.user.contributing) {
        res.status(404).send('ERROR 404: You do not have permissions to contribute');
    }
    else {
        res.render('pages/contribute', {
            title: 'Contribute',
            loggedIn: req.session.loggedIn
        });
    }

})

router.post('/contribute', (req, res) => {
    let name = req.body.name;
    let year = req.body.year;
    let runtime = req.body.runtime;
    let writers = req.body.writers;
    let directors = req.body.directors;
    let actors = req.body.actors;
    let genre = req.body.genre;

    if (!req.session.user.contributing) {
        res.status(400).send('you do not have contributing permissions');
    }
})

module.exports = router;
