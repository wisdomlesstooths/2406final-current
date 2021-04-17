const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let reviewSchema = Schema({
    rating: {
      type: Number,
      min: 1,
      max: 10,
    },
    summary: {
      type: String,
    },
    review: {
      type: String,
    },
    reviewer: { type: Schema.Types.ObjectId, ref: 'User' },
    movie: { type: Schema.Types.ObjectId, ref: 'Movie' },
});

mongoose.model('Review', reviewSchema);