const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
	name: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 30,
		match: /[A-Za-z0-9]+/,
		trim: true
	},
	password: {
		type: String,
		required: true,
	},
	roles: {
		type: [],
		//required: true,
	},
	loggedIn: {
		type: Boolean,
		required: true
	},
	contributing: {
		type: Boolean,
		required: true
	},
	recommendedMovies: {
		type: [String]
		//required: true
	},
	watchedMovies: {
		type: [String]
		//required: true
	},
	usersFollowing: {
		type: [String],
		//required: true
	},
	peopleFollowing: {
		type: [String]
		//required: true
	},
	reviews:  {
		type: [String]
		//required: true
	},
	notifications:  {
			type: [String]
	}
});

module.exports = mongoose.model('User', userSchema, 'users');
