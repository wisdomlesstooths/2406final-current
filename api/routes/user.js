const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Review = require("../../models/Review");
const Movie = require("../../models/Movie");


// GET /api/users/
// need to set a limit of how many users are sent
router.get('/', async (req, res) => {
    await User.find({}).limit(10).then(u => {res.render('pages/users', {users: u});}).catch(e => {res.status(400).send('ERROR 400');});
    //res.send(users);
})

// GET /api/users/:name
router.get('/:name', async (req, res) => {
    let username = req.params.name;
    console.log(username);
    // res.send(`Get User Profile of ${username}`);
    await User.findOne({name: username}).then(u => {res.render('pages/user', {user: u});}).catch(e => {res.status(400).send('ERROR 400');});
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
  var query = await User.find({name: username});
  if (req.body.password){
    await query.update({$set: {password: req.body.password}});
  }

  if (req.body.loggedIn){
    let login = Boolean(req.body.loggedIn);
    await query.update({$set: {loggedIn: Boolean(req.body.loggedIn)}});
    if (login){
      await User.find({loggedIn: true}).update({$set: {loggedIn: false}}).orFail();
    }
  }
  if (req.body.contributing){
    let cont = Boolean(req.body.contributing);
    await query.update({$set: {contributing: cont}});
  }
  //probably have to parse these query requests. it is what it is
  if (req.body.roles){
    await query.update({$push: {roles: req.body.roles}});
  }
  if (req.body.watchedMovies){
    await query.update({$push: {watchedMovies: req.body.watchedMovies}});
  }
  if (req.body.recommendedMovies){
    await query.update({$push: {recommendedMovies: req.body.recommendedMovies}});
  }
  if (req.body.usersFollowing){
    await query.update({$push: {usersFollowing: req.body.usersFollowing}});
  }
  if (req.body.peopleFollowing){
    await query.update({$push: {peopleFollowing: req.body.peopleFollowing}});
  }
  if (req.body.reviews){
    await query.update({$push: {reviews: req.body.reviews}}, callback);
  }
  await query.exec().then(u => {res.render('pages/user', {user: u});}).catch(e => {res.status(400).send('ERROR 400');});
})

//should render profile for this
router.post('/', async (req, res) => {
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
    }).then(u => {res.render('/user', {user: u});}).catch(e => {res.status(400).send('ERROR 400');})
  }
  else {
    res.status(400).send('ERROR 400');
  }
})
// DELETE /api/user/:username
router.delete('/:username', async (req, res) => {
    let username = req.params.username;
    let u = User.findOne({name: username});
    if (u){
      for (ele in u.reviews)
        var review = Review.findById(ele).exec;
        let movie = review.movie;
        await Movie.findByIdAndUpdate(movie, {$pull: {reviews: review.id}}).exec.then(res => {
          console.log(res.modifiedCount);
        }).catch(e => {res.status(400).send('ERROR 400');});
        await review.remove().then(res => {
          console.log(res.removedCount);
        }).catch(e => {res.send('error')});
      await u.remove().catch(e => {res.status(400).send('ERROR 400');});
    }
})

module.exports = router;
