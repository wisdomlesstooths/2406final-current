const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let personSchema = new Schema({
	name: {
		type: String,
		required: true,
		match: /[A-Za-z]+/,
		trim: true
	},
    directed: {
        type: [String]
    },
    wrote: {
        type: [String]
    },
    acted: {
        type: [String]
    }
});

mongoose.model('Person', personSchema);