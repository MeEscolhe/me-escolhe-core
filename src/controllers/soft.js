const {Soft, valSoft} = require('../models/Soft'); 
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {isEmpty} = require('../middlewares/util');

router.get('/', async (req, res) => {
  const softs = await Soft.find().sort('name');
  if(isEmpty(softs))
  {
    return res.status(404).send('No soft skills to show.');
  }
  
  res.send(softs);
  
  
});

router.get('/:id', async (req, res) => {
  
  const softs = await Soft.find();
  if(isEmpty(softs))
  {
    return res.status(404).send('No soft skills to show.');
  }
  const soft = await Soft.findById((mongoose.Types.ObjectId(req.params.id)));
  
  
  

  if (!soft) return res.status(404).send('The soft skill with the given ID was not found.');

  res.send(soft);
});

router.post('/', async (req, res) => {
  const { error } = valSoft(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let soft = new Soft({ 

    name: req.body.name
    
  });
  soft = await soft.save();
  
  res.send(soft);
});

router.put('/:id', async (req, res) => {
  const { error } = valSoft(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  const soft = await Soft.findByIdAndUpdate((mongoose.Types.ObjectId(req.params.id)), 
	{ 
    name: req.body.name
  }, 
  { new: true });
        

  if (!soft) 
  {
    return res.status(404).send('The soft skill with the given ID was not found.');
  } 
  
  res.send(soft);
  
});

router.delete('/:id', async (req, res) => {
  const soft = await Soft.findByIdAndRemove((mongoose.Types.ObjectId(req.params.id)));

  if (!soft) return res.status(404).send('The soft skill with the given ID was not found.');

  res.send(soft);
});



module.exports = router; 