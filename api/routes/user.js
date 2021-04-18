const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Review = require("./ReviewModel");
const Movie = require(".MovieModel");


// GET /api/users/
// need to set a limit of how many users are sent
router.get('/', async (req, res) => {
    let users = await User.find({}).limit(10);
    res.send(users);
})

// GET /api/users/:name
router.get('/:name', async (req, res) => {
    let username = req.params.name;
    // res.send(`Get User Profile of ${username}`);
    let user = await User.find({ name: username }).then(res => {
      console.log(res.removedCount);
    }).orFail(() => new Error('Not Found'));
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

    User.findOneAndUpdate({ name: username }, {$set: {name: username, password: password}}, (err, user) => {
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
router.delete('/:username', async (req, res) => {
    let username = req.params.username;
    let u = User.findOne({name: username}, callback);
    if (u){
      for ele in u.reviews
        let review = Review.findById(ele, callback);
        let movie = review.movie;
        await Movie.findByIdAndUpdate(movie, {$pull {reviews: review.id}, callback}.then(res => {
          console.log(res.modifiedCount);
        }).orFail();
        await review.remove(callback).then(res => {
          console.log(res.removedCount);
        }).catch(e => {res.send('error')});
        //can also do .orFail(new Error('No docs found!'))
        //or sinplt .orFail();
      await u.remove(callback).then(res =>{
        res.send('user removed')
      }).catch(e => {res.send('error')});
    }
})

module.exports = router;
