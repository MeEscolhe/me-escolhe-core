const {Experience, valExperience} = require('../models/Experience'); 
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {isEmpty} = require('../middlewares/util');

router.get('/', async (req, res) => {
  const experiences = await Experience.find();
  if(isEmpty(experiences))
  {
    return res.status(404).send('No experiences to show.');
  }
  
  res.send(experiences);
  
  
});

router.get('/:id', async (req, res) => {
  
  const experiences = await Experience.find();
  if(isEmpty(experiences))
  {
    return res.status(404).send('No experiences to show.');
  }
  const experience = await Experience.findById((mongoose.Types.ObjectId(req.params.id)));
  
  
  

  if (!experience) return res.status(404).send('The experience with the given ID was not found.');

  res.send(experience);
});






module.exports = router; 