const {WorkExperience, valWorkExperience} = require('../models/work-experience'); 
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { isEmpty} = require('../middlewares/util');

router.get('/', async (req, res) => {
  const workExperiences = await WorkExperience.find().sort('role');
  if(isEmpty(workExperiences))
  {
    return res.status(404).send('No workExperiences to show.');
  }
  
  res.send(workExperiences);
  
  
});

router.get('/:id', async (req, res) => {
  
  const workExperiences = await WorkExperience.find();
  if(isEmpty(workExperiences))
  {
    return res.status(404).send('No workExperiences to show.');
  }
  const workExperience = await WorkExperience.findById((mongoose.Types.ObjectId(req.params.id)));
  
  
  

  if (!workExperience) return res.status(404).send('The workExperience with the given ID was not found.');

  res.send(workExperience);
});

router.post('/', async (req, res) => {
  const { error } = valWorkExperience(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let workExperience = new WorkExperience({ 
    role: req.body.role,
	institution: req.body.institution,
	durationInMonths: req.body.durationInMonths
    
  });
  workExperience = await workExperience.save();
  
  res.send(workExperience);
});

router.put('/:id', async (req, res) => {
  const { error } = valWorkExperience(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  let varDurationInMonths = req.body.durationInMonths;
  if(typeof varDurationInMonths === 'undefined' )
  {
    const workExperience = await WorkExperience.findByIdAndUpdate((mongoose.Types.ObjectId(req.params.id)), 
	{ 
        role: req.body.role,
        institution: req.body.institution
    }, 
    { new: true });
    if (!workExperience) 
    {
        return res.status(404).send('The workExperience with the given ID was not found.');
    } 
    res.send(workExperience);


  }

    else {
      const workExperience = await WorkExperience.findByIdAndUpdate((mongoose.Types.ObjectId(req.params.id)), 
	    { 
        role: req.body.role,
        institution: req.body.institution,
        durationInMonths: varDurationInMonths
      }, 
        { new: true });
        if (!workExperience) 
        {
          return res.status(404).send('The workExperience with the given ID was not found.');
        } 
        res.send(workExperience);
    }


  
});

router.delete('/:id', async (req, res) => {
  const workExperience = await WorkExperience.findByIdAndRemove((mongoose.Types.ObjectId(req.params.id)));

  if (!workExperience) return res.status(404).send('The workExperience with the given ID was not found.');

  res.send(workExperience);
});



module.exports = router; 