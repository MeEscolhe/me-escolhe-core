const { AcademicExperience, valAcademicExperience} = require('../models/academic-experience'); 
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {isEmpty} = require('../middlewares/util');

router.get('/', async (req, res) => {
  const academicExperiences = await AcademicExperience.find().sort('title');
  if(isEmpty(academicExperiences))
  {
    return res.status(404).send('No academicExperiences to show.');
  }
  
  res.send(academicExperiences);
  
  
});

router.get('/:id', async (req, res) => {
  
  const academicExperiences = await AcademicExperience.find();
  if(isEmpty(academicExperiences))
  {
    return res.status(404).send('No academicExperiences to show.');
  }
  const academicExperience = await AcademicExperience.findById((mongoose.Types.ObjectId(req.params.id)));

  if (!academicExperience) return res.status(404).send('The academicExperiences with the given ID was not found.');

  res.send(academicExperience);
});

router.post('/', async (req, res) => {
  const { error } = valAcademicExperience(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let academicExperience = new AcademicExperience({ 
    title: req.body.title,
	category: req.body.category,
	institution: req.body.institution
    
  });
  academicExperience = await academicExperience.save();
  
  res.send(academicExperience);
});

router.put('/:id', async (req, res) => {
  const { error } = valAcademicExperience(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  const academicExperience = await AcademicExperience.findByIdAndUpdate((mongoose.Types.ObjectId(req.params.id)), 
	{ 
    title: req.body.title,
    category: req.body.category,
    institution: req.body.institution
  }, 
  { new: true });
        

  if (!academicExperience) 
  {
    return res.status(404).send('The academicExperiences with the given ID was not found.');
  } 
  
  res.send(academicExperience);
  
});

router.delete('/:id', async (req, res) => {
  const academicExperience = await AcademicExperience.findByIdAndRemove((mongoose.Types.ObjectId(req.params.id)));

  if (!academicExperience) return res.status(404).send('The academicExperiences with the given ID was not found.');

  res.send(academicExperience);
});



module.exports = router; 