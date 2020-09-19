const {Experience} = require('../models/Experience'); 
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

router.post('/', async (req, res) => {
 // const { error } = valLab(req.body); 
 // if (error) return res.status(400).send(error.details[0].message);

  let experience = new Experience({ 
    academic: req.body.academic,
    work: req.body.work,
    
  });
  experience = await experience.save();
  
  res.send(experience);
});


router.put('/:id', async (req, res) => 
{
  //const { error } = valExperience(req.body); 
  //if (error) return res.status(400).send(error.details[0].message);
  const experience = await Experience.findByIdAndUpdate((mongoose.Types.ObjectId(req.params.id)), 
  { 
    academic: req.body.academic,
    work: req.body.work,
        
   }, 
   { new: true });
   if (!experience) 
   {
     return res.status(404).send('The experience with the given ID was not found.');
   } 
   res.send(experience);
});
  

  

router.delete('/:id', async (req, res) => {
  const experience = await Experience.findByIdAndRemove((mongoose.Types.ObjectId(req.params.id)));

  if (!experience) return res.status(404).send('The experience with the given ID was not found.');

  res.send(experience);
});





module.exports = router; 