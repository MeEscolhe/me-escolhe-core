const {Hard, valHard} = require('../models/Hard'); 
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {isEmpty} = require('../middlewares/util');

router.get('/', async (req, res) => {
  const hards = await Hard.find().sort('name');
  if(isEmpty(hards))
  {
    return res.status(404).send('No hard skills to show.');
  }
  
  res.send(hards);
  
  
});

router.get('/:id', async (req, res) => {
  
  const hards = await Hard.find();
  if(isEmpty(hards))
  {
    return res.status(404).send('No hard skills to show.');
  }
  const hard = await Hard.findById((mongoose.Types.ObjectId(req.params.id)));
  
  
  

  if (!hard) return res.status(404).send('The hard with the given ID was not found.');

  res.send(hard);
});

router.post('/', async (req, res) => {
  const { error } = valHard(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let hard = new Hard({ 
    name: req.body.name,
    level: req.body.level,
    
  });
  hard = await hard.save();
  
  res.send(hard);
});

router.put('/:id', async (req, res) => {
  const { error } = valHard(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let varName = req.body.name;
  let varLevel = req.body.level;
  
  const hard = await Hard.findByIdAndUpdate((mongoose.Types.ObjectId(req.params.id)), 
  { 
    name: req.body.name,
    level: req.body.level
  }, 
    { new: true });
  if (!hard) 
  {
    return res.status(404).send('The hard with the given ID was not found.');
  } 
  
  res.send(hard);
    


 
  
});

router.delete('/:id', async (req, res) => {
  const hard = await Hard.findByIdAndRemove((mongoose.Types.ObjectId(req.params.id)));

  if (!hard) return res.status(404).send('The hard skills with the given ID was not found.');

  res.send(hard);
});



module.exports = router; 