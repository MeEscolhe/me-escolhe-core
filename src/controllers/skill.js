const {Skill} = require('../models/Skill'); 
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {isEmpty} = require('../middlewares/util');

router.get('/', async (req, res) => {
  const skills = await Skill.find().sort('name');
  if(isEmpty(skills))
  {
    return res.status(404).send('No skills to show.');
  }
  
  res.send(skills);
  
  
});

router.get('/:id', async (req, res) => {
  
  const skills = await Skill.find();
  if(isEmpty(skills))
  {
    return res.status(404).send('No skills to show.');
  }
  const skills = await Skill.findById((mongoose.Types.ObjectId(req.params.id)));
  
  
  

  if (!skills) return res.status(404).send('The skills with the given ID was not found.');

  res.send(skills);
});




module.exports = router; 