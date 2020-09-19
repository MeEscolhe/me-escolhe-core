const {Lab, valLab} = require('../models/Lab'); 
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {isEmpty} = require('../middlewares/util');

router.get('/', async (req, res) => {
  const labs = await Lab.find().sort('name');
  if(isEmpty(labs))
  {
    return res.status(404).send('No labs to show.');
  }
  
  res.send(labs);
  
  
});

router.get('/:id', async (req, res) => {
  
  const labs = await Lab.find();
  if(isEmpty(labs))
  {
    return res.status(404).send('No labs to show.');
  }
  const lab = await Lab.findById((mongoose.Types.ObjectId(req.params.id)));
  
  
  

  if (!lab) return res.status(404).send('The lab with the given ID was not found.');

  res.send(lab);
});

router.post('/', async (req, res) => {
  const { error } = valLab(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let lab = new Lab({ 
    name: req.body.name,
    description: req.body.description,
    
  });
  lab = await lab.save();
  
  res.send(lab);
});

router.put('/:id', async (req, res) => {
  const { error } = valLab(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  const lab = await Lab.findByIdAndUpdate((mongoose.Types.ObjectId(req.params.id)), 
	{ 
    name: req.body.name,
    description: req.body.description,
  }, 
  { new: true });
        

  if (!lab) 
  {
    return res.status(404).send('The lab with the given ID was not found.');
  } 
  
  res.send(lab);
  
});

router.delete('/:id', async (req, res) => {
  const lab = await Lab.findByIdAndRemove((mongoose.Types.ObjectId(req.params.id)));

  if (!lab) return res.status(404).send('The lab with the given ID was not found.');

  res.send(lab);
});



module.exports = router; 