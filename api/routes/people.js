const express = require('express');
const router = express.Router();
const Person = require("../../models/Person");

router.get('/', async (req, res) => {
  await Person.find({}).limit(10).then(p => {res.render('pages/people', {people: p});}).catch(e => {res.send('error');});
})
//have to make send

// GET /api/persons
router.get('/:name', async (req, res) => {
  let person = req.params.name.replace("%20", " ");
  await Person.findOne({name: person}).then(p => {res.render('pages/person', {person: p});}).catch(e => {res.send('error');});
})

//router.put to follow person

router.post('/', async (req, res) => {
  let person = req.params.name;
  if (person && !Person.exists({name: person})){
    await Person.create({
      name: person,
      directed: [],
      wrote: [],
      acted:[]
    }).then(p => {res.render('pages/person', {person: p});}).catch(e => {res.status(400).send('ERROR 400');});
  }
})

module.exports = router;
