//const {Teacher, valTeacher} = require('../models/Teacher'); 
const {Teacher} = require('../models/Teacher'); 
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {isEmpty} = require('../middlewares/util');

router.get('/', async (req, res) => {
  const teachers = await Teacher.find().sort('name');
  if(isEmpty(teachers))
  {
    return res.status(404).send('No teachers to show.');
  }
  
  res.send(teachers);
  
  
});

router.get('/:id', async (req, res) => {
  
  const teachers = await Teacher.find();
  if(isEmpty(teachers))
  {
    return res.status(404).send('No teachers to show.');
  }
  const teacher = await Teacher.findById((mongoose.Types.ObjectId(req.params.id)));
  
  
  

  if (!teacher) return res.status(404).send('The teacher with the given ID was not found.');

  res.send(teacher);
});

router.post('/', async (req, res) => {
  //const { error } = valTeacher(req.body); 
  //if (error) return res.status(400).send(error.details[0].message);

  let teacher = new Teacher({ 
    name: req.body.name,
	email: req.body.email,
	description: req.body.description,
	labId : req.body.labId,
	managements: req.body.managements,
	feedbackRequests : req.body.feedbackRequests
    
  });
  teacher = await teacher.save();
  
  res.send(teacher);
});

router.put('/:id', async (req, res) => {
  //const { error } = valTeacher(req.body); 
  //if (error) return res.status(400).send(error.details[0].message);
  const teacher = await Teacher.findByIdAndUpdate((mongoose.Types.ObjectId(req.params.id)), 
	{ 
	name: req.body.name,
	email: req.body.email,
	description: req.body.description,
	labId : req.body.labId,
	managements: req.body.managements,
	feedbackRequests : req.body.feedbackRequests
  }, 
  { new: true });
        

  if (!teacher) 
  {
    return res.status(404).send('The teacher with the given ID was not found.');
  } 
  
  res.send(teacher);
  
});

router.delete('/:id', async (req, res) => {
  const teacher = await Teacher.findByIdAndRemove((mongoose.Types.ObjectId(req.params.id)));

  if (!teacher) return res.status(404).send('The teacher with the given ID was not found.');

  res.send(teacher);
});



module.exports = router; 