const mongoose = require('mongoose');
const express = require('express');
const app = express();

const labs = require('./controllers/lab');
const workExperiences = require('./controllers/work-experience');
const academicExperiences = require('./controllers/academic-experience');
const experiences = require('./controllers/experience');
const languages = require('./controllers/language');
const softSkills = require('./controllers/soft');
const hardSkills = require('./controllers/hard');
const skills = require('./controllers/skill');
const selections = require('./controllers/selection');
const phases = require('./controllers/phase');
const projects = require('./controllers/project');
const feedbackRequests = require('./controllers/feedback-request');
const students = require('./controllers/student');
const teachers = require('./controllers/teacher');

mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);


mongoose.connect('mongodb://localhost:27017/apiCompcult')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/labs', labs);
app.use('/workExperiences', workExperiences);
app.use('/academicExperiences', academicExperiences);
app.use('/experiences', experiences);
app.use('/languages', languages);
app.use('/softSkills', softSkills);
app.use('/hardSkills', hardSkills);
app.use('/skills', skills);
app.use('/selections', selections);
app.use('/phases', phases);
app.use('/projects', projects);
app.use('/feedbackRequests', feedbackRequests);
app.use('/students', students);
app.use('/teachers', teachers);
const port = process.env.PORT || 27017;
app.listen(port, () => console.log(`Listening on port ${port}...`));




