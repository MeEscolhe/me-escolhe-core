const {Phase} = require('../models/Phase'); 
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { isEmpty} = require('../middlewares/util');

router.get('/', async (req, res) => {
  const phases = await Phases.find().sort('name');
  if(isEmpty(phases))
  {
    return res.status(404).send('No phases to show.');
  }
  
  res.send(phases);
  
  
});

router.get('/:id', async (req, res) => {
  
  const phases = await Phases.find();
  if(isEmpty(phases))
  {
    return res.status(404).send('No phases to show.');
  }
  const phases = await Phases.findById((mongoose.Types.ObjectId(req.params.id)));
  
  
  

  if (!phases) return res.status(404).send('The phases with the given ID was not found.');

  res.send(phases);
});

router.post('/', async (req, res) => {
  const { error } = valPhases(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let phases = new Phases({ 
    students: req.body.students,
    selectionId: req.body.selectionId
    
  });
  phases = await phases.save();
  
  res.send(phases);
});

router.put('/:id', async (req, res) => {
  const { error } = valPhases(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  const phases = await Phases.findByIdAndUpdate((mongoose.Types.ObjectId(req.params.id)), 
	{ 
		students: req.body.students,
		selectionId: req.body.selectionId
  }, 
  { new: true });
        

  if (!phases) 
  {
    return res.status(404).send('The phases with the given ID was not found.');
  } 
  
  res.send(phases);
  
});

router.delete('/:id', async (req, res) => {
  const phases = await Phases.findByIdAndRemove((mongoose.Types.ObjectId(req.params.id)));

  if (!phases) return res.status(404).send('The phases with the given ID was not found.');

  res.send(phases);
});



module.exports = router; 