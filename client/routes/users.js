const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// router.get('/', async (req, res) => {
//     await User.find({}).limit(10).then(u => {res.render('pages/users', {users: u});}).catch(e => {res.send('error');});
//     //res.send(users);
// })

module.exports = router;
