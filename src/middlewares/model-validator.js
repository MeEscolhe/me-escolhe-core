const Joi = require("joi");

const validate = (keys, model) => {
  const validator = Joi.object().keys(keys);
  return validator.validate(model);
};

const id = () => Joi.string().min(1).max(30).required();

const string = () => Joi.string().allow("").min(0).max(50).required();

const boolean = () => Joi.boolean().required();

const number = () => Joi.number().required();

const numericRange = (min, max) => number().min(min).max(max);

const array = (items) => Joi.array().items(items).min(0).required();

const arrayOfIds = () => array(id());

module.exports = {
  id,
  string,
  boolean,
  number,
  numericRange,
  array,
  arrayOfIds,
  validate,
};
