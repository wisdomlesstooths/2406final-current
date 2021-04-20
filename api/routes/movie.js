const express = require('express');
const router = express.Router();
const Movie = require("../../models/Movie");
// GET /api/movies
router.get('/', async (req, res) => {
  await Movie.find({}).limit(10).then(p => {res.render('pages/movies', {movies: p});}).catch(e => {res.send('error');});
})

// GET /api/movies/:title

router.get('/:title', async (req, res) => {
  let movie = req.params.title.replace("%20", " ");
  console.log(movie);
  await Movie.findOne({title: movie}).then(p => {res.render('pages/movie', {movie: p});}).catch(e => {res.send('error');});
})

// POST /api/movies, create
router.post('/', async (req, res) => {
    if (req.query.title && req.query.year && req.query.runtime && req.query.plot && req.query.genre && (req.query.writer || req.query.director || req.query.actors)&& !Movie.exists({title: req.query.title})){
      let mov = await Movie.create({
        title: req.query.title,
        year: req.query.year,
        runtime: req.query.runtime,
        plot: req.query.plot,
        genre: req.query.genre, //should parse the genre
        reviews: []
      }).catch(e => {res.status(400).send('ERROR 400');});

      if (req.query.writer) {
        await mov.update({$set: {writer: req.query.writer}});
      }
      if (req.query.director) {
        await mov.update({$set: {director: req.query.director}});
      }
      if (req.query.actors) {
        await mov.update({$set: {actors: req.query.actors}});
      }
      res.render('pages/movie', {movie: mov});
    }
    else {
      res.status(400).send('ERROR 400');
    }
})

// GET /api/movies/queryMov
// PUT /api/user/:username
// GET /api/movies/queryMov
router.post('/search', async (req, res) => {
  if(!req.body.title && !req.body.genre && !req.body.year && !req.body.actors){
    await Movie.find({}).limit(10).then(p => {res.render('pages/movies', {movies: p}); return;}).catch(e => {res.send('error');});
  }
  let queries = [];

  if (req.body.title) {
    queries.push({title: {$regex: `${req.body.title}`, $options: 'gi'}});
    /*await Movie.find({title: {$regex: `${req.body.title}`, $options: 'gi'}}).limit(10).then(movie => {
      res.render('pages/movie', {movie: movie});
          //res.render('pages/movie', {movie: movie});
      }).catch(err => {
        res.send('invalid')
      });*/
  }

  if (req.body.genre) {
    //req.body.genre = req.body.genre.charAt(0).toUpperCase() + req.bodygenre.slice(1);
    queries.push({genre: {$regex: `${req.body.genre}`, $options: 'gi'}});
  }

  if (req.body.year) {
    queries.push({year: {$regex: `${req.body.year}`, $options: 'gi'}});
  }

  if (req.body.actors) {
    queries.push({actors: {$regex: `${req.body.actors}`, $options: 'gi'}});
  }

  await Movie.find({$and: queries}).limit(10).then(mov => {
        res.render('pages/movies', {movies: mov});
    }).catch(err => {
      res.send('invalid')
  });
})

//add movie to user's watched list
router.put('/:movie', async (req, res) => {
  if(req.session.user){
    let u = await User.findOne({name: req.session.user.name}).catch(e => {res.status(400).send('ERROR 400');});
    let movie = req.params.title.replace("%20", " ");
    let thisUser = await u.update({$push: {watchedMovies: movie}}).catch(err => {res.send('invalid')});
    res.send(thisUser.watchedMovies);

  }
  else {
    res.status(400).send('ERROR 400');
  }
})

module.exports = router;