const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = Schema({
	name: {
		type: String,
		required: true,
		//minlength: 1,
		//maxlength: 30,
		match: /[A-Za-z0-9]+/,
		trim: true
	},
	password: {
		type: String,
		required: true,
	},
	roles: {
		type: [],
		required: true,
	},
	loggedIn: {
		type: Boolean,
	},
	contributing: {
		type: Boolean,
	},
	recommendedMovies: {
		type: [String],

	},
	watchedMovies: {
		type: [String],

	},
	usersFollowing: {
		type: [String],

	},
	peopleFollowing: {
		type: [String],

	},
	reviews:  {
		type: [String]
	},
});

mongoose.model('User', userSchema);