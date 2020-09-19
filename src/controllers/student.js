const {Student} = require('../models/Student'); 
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {isEmpty} = require('../middlewares/util');

router.get('/', async (req, res) => {
  const students = await Student.find().sort('registration');
  if(isEmpty(students))
  {
    return res.status(404).send('No students to show.');
  }
  
  res.send(students);
  
  
});

router.get('/:registration', async (req, res) => {
  
  const students = await Student.find();
  if(isEmpty(students))
  {
    return res.status(404).send('No students to show.');
  }
  const student = await Student.find(req.params.registration);
  
  
  

  if (!student) return res.status(404).send('The student with the given ID was not found.');

  res.send(student);
});

router.post('/', async (req, res) => {
  //const { error } = valStudent(req.body); 
  //if (error) return res.status(400).send(error.details[0].message);

  let student = new Student({ 
	registration: req.body.registration,
	name: req.body.name,
	email: req.body.email,
	cra: req.body.cra,
	description: req.body.description,
	skills: req.body.skills,
	experientes: req.body.experientes,
	phases: req.body.phases
    
  });
  student = await student.save();
  
  res.send(student);
});

router.put('/:id', async (req, res) => {
  //const { error } = valStudent(req.body); 
  //if (error) return res.status(400).send(error.details[0].message);
  const student = await Student.findOneAndUpdate(req.params.registration, 
 
	{ 
		
		name: req.body.name,
		email: req.body.email,
		cra: req.body.cra,
		description: req.body.description,
		skills: req.body.skills,
		experiences: req.body.experientes,
		phases: req.body.phases
    }, 
  { new: true });
        

  if (!student) 
  {
    return res.status(404).send('The student with the given ID was not found.');
  } 
  
  res.send(student);
  
});

router.delete('/:registration', async (req, res) => {
	const student = await Student.findOneAndDelete(req.params.registration); 

  if (!student) return res.status(404).send('The student with the given registration was not found.');

  res.send(student);
});



module.exports = router; 