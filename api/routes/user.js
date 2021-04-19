const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Review = require("../../models/Review");
const Movie = require("../../models/Movie");


// GET /api/users/
// need to set a limit of how many users are sent
router.get('/', (req, res) => {
    User.find({}).limit(10).then(r => {res.send(r);}).catch(e => {res.send('error')});
    //res.send(users);
})

// GET /api/users/:name
router.get('/:name', async (req, res) => {
    let username = req.params.name;
    // res.send(`Get User Profile of ${username}`);
    let user = await User.find({ name: username }).then(res => {  console.log(res.removedCount);  }).catch(e => {res.send('error')});;
})


// Equivalent to createUser in index.js
// // POST /api/users
// router.post('/', (req, res) => {
//     let username = req.body.username;
//     let password = req.body.password;
//     res.send(`Created user with username: ${username} and password: ${password}`);
// })

// PUT /api/user/:username
router.put('/:username', async (req, res) => {
    let username = req.params.username;
    let password = req.body.password;

    await User.findOneAndUpdate({ name: username }, {$set: {name: username, password: password}}).exec().then(u => {
      res.render('/user', {
        user: u
      });
    }).catch(e => {res.send('error')});
})
// DELETE /api/user/:username
router.delete('/:username', async (req, res) => {
    let username = req.params.username;
    let u = User.findOne({name: username}, callback);
    if (u){
      for (ele in u.reviews)
        var review = Review.findById(ele, callback);
        let movie = review.movie;
        await Movie.findByIdAndUpdate(movie, {$pull: {reviews: review.id}}).exec.then(res => {
          console.log(res.modifiedCount);
        }).catch(e => {res.send('error')});
        await review.remove().then(res => {
          console.log(res.removedCount);
        }).catch(e => {res.send('error')});
      await u.remove().then(res =>{
        res.send('user removed')
      }).catch(e => {res.send('error')});
    }
})

module.exports = router;
