const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let movieSchema = new Schema({
    title:{
      type: String,
      required: true
    },
    year: {
      type: String,
      required: true
    },
    rating: {
      type: [Number],
      min: 1,
      max: 10,
    },
    runtime: {
      type: String,
      required: true
    },
    plot: {
      type: String,
      required: true
    },
    genre: {
      type: [String],
      required: true
    },
      director: {
      type: [String],
      required: true
    },
    writer: {
      type: [String],
      required: true
    },
      actors: {
      type: [String],
      required: true
    },
    reviews:  {
        type: [String],
    }
  });

  mongoose.model('Movie', movieSchema);