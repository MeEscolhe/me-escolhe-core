const {Project} = require('../models/Project'); 
//const {Project, valProject} = require('../models/Project'); 
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {isEmpty} = require('../middlewares/util');
const ObjectId = require('mongodb').ObjectID;

router.get('/', async (req, res) => {
  const projects = await Project.find().sort('name');
  if(isEmpty(projects))
  {
    return res.status(404).send('No projects to show.');
  }
  
  res.send(projects);
  
  
});

router.get('/:id', async (req, res) => {
  
  const projects = await Project.find();
  if(isEmpty(projects))
  {
    return res.status(404).send('No projects to show.');
  }
  const project = await Project.findById((mongoose.Types.ObjectId(req.params.id)));
  
  
  

  if (!project) return res.status(404).send('The project with the given ID was not found.');

  res.send(project);
});

router.post('/', async (req, res) => {
  //const { error } = valProject(req.body); 
  //if (error) return res.status(400).send(error.details[0].message);

  let project = new Project({ 
    name: req.body.name,
	description: req.body.description,
	selections: req.body.selections
    
  });
  project = await project.save();
  
  res.send(project);
});

router.put('/:id', async (req, res) => {
  //const { error } = valProject(req.body); 
  //if (error) return res.status(400).send(error.details[0].message);
  const project = await Project.findByIdAndUpdate((mongoose.Types.ObjectId(req.params.id)), 
	{ 
		name: req.body.name,
		description: req.body.description,
		selections: req.body.selections
  }, 
  { new: true });
        

  if (!project) 
  {
    return res.status(404).send('The project with the given ID was not found.');
  } 
  
  res.send(project);
  
});

router.delete('/:id', async (req, res) => {
  const project = await Project.findByIdAndRemove((mongoose.Types.ObjectId(req.params.id)));

  if (!project) return res.status(404).send('The project with the given ID was not found.');

  res.send(project);
});



module.exports = router; 