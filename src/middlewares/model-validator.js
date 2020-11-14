const Joi = require("joi");

const validate = (keys, model) => {
  const validator = Joi.object().keys(keys);
  return validator.validate(model);
};

const reference = () => Joi.string().min(1).max(30);

const id = () => reference().required();

const string = () => Joi.string().allow("").min(0).max(50).required();

const boolean = () => Joi.boolean().required();

const number = () => Joi.number().required();

const numericRange = (min, max) => number().min(min).max(max);

const array = (items) => Joi.array().items(items).required();

const arrayOfRegistrations = () => array(Joi.number());

const arrayOfIds = () => array(reference());

const date = () => Joi.date().iso().required();

const finalDate = (initialDateName) =>
  Joi.date().iso().greater(Joi.ref(initialDateName)).required();

module.exports = {
  reference,
  id,
  string,
  boolean,
  number,
  numericRange,
  array,
  arrayOfIds,
  arrayOfRegistrations,
  validate,
  date,
  finalDate,
};
