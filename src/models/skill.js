// Importing dependences
const Joi = require('joi');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;



// Creating schema
const SkillSchema = mongoose.model('Skill',new mongoose.Schema({
  languages: {
    type: [ObjectId],
    ref: 'LanguageSchema',
    required: true,
    default: []
  },
  soft: {
    type: [ObjectId],
    ref: 'SoftSchema',
    required: true,
    default: []
  },
  hard: {
    type: [ObjectId],
    ref: 'HardSchema',
    required: true,
    default: []
    
  }}));



exports.Skill = SkillSchema; 

















