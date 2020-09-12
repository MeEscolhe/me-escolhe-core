const {FeedbackRequest, valFeedbackRequest} = require('../models/FeedbackRequest'); 
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {isEmpty} = require('../middlewares/util');

router.get('/', async (req, res) => {
  const feedbackRequests = await FeedbackRequest.find();
  if(isEmpty(feedbackRequests))
  {
    return res.status(404).send('No feedbackRequests to show.');
  }
  
  res.send(feedbackRequests);
  
  
});

router.get('/:id', async (req, res) => {
  
  const feedbackRequests = await FeedbackRequest.find();
  if(isEmpty(feedbackRequests))
  {
    return res.status(404).send('No feedbackRequests to show.');
  }
  const feedbackRequest = await FeedbackRequest.findById((mongoose.Types.ObjectId(req.params.id)));
  
  
  

  if (!feedbackRequest) return res.status(404).send('The feedbackRequest with the given ID was not found.');

  res.send(feedbackRequest);
});

router.post('/', async (req, res) => {
  const { error } = valFeedbackRequest(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let feedbackRequest = new FeedbackRequest({ 
    studentId: req.body.studentId,
    phaseId: req.body.phaseId
    
  });
  feedbackRequest = await feedbackRequest.save();
  
  res.send(feedbackRequest);
});

router.put('/:id', async (req, res) => {
  const { error } = valFeedbackRequest(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  const feedbackRequest = await FeedbackRequest.findByIdAndUpdate((mongoose.Types.ObjectId(req.params.id)), 
	{ 
		studentId: req.body.studentId,
		phaseId: req.body.phaseId
  }, 
  { new: true });
        

  if (!feedbackRequest) 
  {
    return res.status(404).send('The feedbackRequest with the given ID was not found.');
  } 
  
  res.send(feedbackRequest);
  
});

router.delete('/:id', async (req, res) => {
  const feedbackRequest = await FeedbackRequest.findByIdAndRemove((mongoose.Types.ObjectId(req.params.id)));

  if (!feedbackRequest) return res.status(404).send('The feedbackRequest with the given ID was not found.');

  res.send(feedbackRequest);
});



module.exports = router; 