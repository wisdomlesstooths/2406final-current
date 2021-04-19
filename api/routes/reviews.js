const express = require('express');
const router = express.Router();
const Review = require("../../models/Review");

// GET /api/users/
router.get('/', (req, res) => {
  res.send('Get List Of Reviews');
})
//have to make sendReview

// GET /api/reviews
router.get('/:id', async (req, res) => {
  let review_id = req.params.id;
  let review = await Review.findById(review_id);
  //res.send(review);
  res.render('/review', {
    review: review
  })
})

// POST /api/users
router.post('/', async (req, res) => {
    let movieName = req.body.movie;
    //let movie= async get movie object; unless we change model
    let summary = req.body.summary;
    let description = req.body.description;
    let rating = req.body.rating;
    let user = await User.find().where("loggedIn").equals(true);
    let r = new Review({
      //movie: movie,
      rating: rating,
      summary: summary,
      review: description,
      user: user
    });
    r.save(function(err, result){
      if(err){
        console.log(err);
        res.status(500).send("Error creating review.");
        return;
      }
      res.status(201).send(JSON.stringify(u));
    })
    res.render('/review', {
      review: r
    })
})

// PUT /api/user/:username
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let movie = req.body.movie;
    let summary = req.body.summary;
    let description = req.body.description;
    let rating = req.body.rating;

    res.send(`${id}, ${movie}, ${summary}, ${description}, ${rating}`);
})

// DELETE /api/user/:username
router.delete('/:id', (req, res) => {
    let id = req.params.id;

    res.send(`Delete review with ${id}`);
})

module.exports = router;
