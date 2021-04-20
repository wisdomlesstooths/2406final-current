const express = require('express');
const router = express.Router();
const Review = require("../../models/Review");
const Movie = require("../../models/Movie");
const User = require("../../models/User");

// GET /api/users/
router.get('/', async (req, res) => {
  await Review.find({}).limit(10).then(r => {res.render('pages/reviews', {reviews: r});}).catch(e => {res.send('error');});
})
//have to make sendReview

// GET /api/reviews
router.get('/:id', async (req, res) => {
  let review_id = req.params.id;
  await Review.findById(review_id).then(r => {res.render('pages/review', {review: r});}).catch(e => {res.send('error');});

})

// POST /api/review

//add review
router.post('/', async (req, res) => {
    let movieName = req.body.movie;
    let movie = await Movie.findOne({title: movie}).catch(e => {res.status(400).send('ERROR 400');});
    //let movie= async get movie object; unless we change model
    if (!req.session.user){
      res.status(400).send('ERROR 400');
    }
    else if (req.body.rating || (req.body.rating && req.body.summary  && req.body.review)){
      if (req.body.rating && req.body.summary  && req.body.review){
        let review = await Review.create({
          rating: req.body.rating,
          summary: req.body.summary,
          review: req.body.review,
          movie: req.body.movie,
          user: req.session.user
        }).then(r => {res.render('pages/review', {review: r});}).catch(e => {res.status(400).send('ERROR 400');});
      }
      else{
        let review = await Review.create({
          rating: req.body.rating,
          movie: req.body.movie,
          user: req.session.user
        }).then(r => {res.render('pages/review', {review: r});}).catch(e => {res.status(400).send('ERROR 400');});
      }
      await movie.update()
    }
    else{
      res.status(400).send('ERROR 400');
    }
})

//add review
router.post('/:movieID', async (req, res) => {
  let movieID = req.param.movieID;
  let movie = await Movie.findById(movieID).catch(e => {res.status(400).send('ERROR 400');});
  //let movie= async get movie object; unless we change model
  if (!req.session.user){
    res.status(400).send('ERROR 400');
  }
  else if (req.body.rating || (req.body.rating && req.body.summary  && req.body.review)){
    var u = await User.findOne({name: req.session.user.name}).catch(e => {res.status(400).send('ERROR 400');});
    if (req.body.rating && req.body.summary  && req.body.review){
      let review = await Review.create({
        rating: req.body.rating,
        summary: req.body.summary,
        review: req.body.review,
        movie: movie,
        user: u
      }).then(r => {res.render('pages/review', {review: r});}).catch(e => {res.status(400).send('ERROR 400');});
    }
    else{
      let review = await Review.create({
        rating: req.body.rating,
        movie: movie,
        user: u
      }).then(r => {res.render('pages/review', {review: r});}).catch(e => {res.status(400).send('ERROR 400');});
    }
    await movie.update()
  }
  else{
    res.status(400).send('ERROR 400');
  }
})

module.exports = router;
