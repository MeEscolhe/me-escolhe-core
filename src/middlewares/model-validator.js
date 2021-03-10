const Joi = require("joi");

/**
 * Validate handler
 * @param {object} keys attributes
 * @param {object} model model object
 * @returns {Joi.ValidationResult} validation result
 */
const validate = (keys, model) => {
  const validator = Joi.object().keys(keys);
  return validator.validate(model);
};

/**
 * Validate foreing key handler
 * @param {object} model model object
 * @param {string} type model name
 * @param {object} key attribute
 * @returns {promise} validation result
 */
const validateForeingKey = (model, type, key) => {
  return new Promise((resolve, reject) => {
    model.findOne({ [type]: key }, (err, result) => {
      if (result) {
        return resolve(true);
      } else
        return reject(
          new Error(
            `FK Constraint 'checkObjectsExists' for '${key.toString()}' does not exist\n`
          )
        );
    });
  });
};

// String reference matcher
const reference = () => Joi.string().min(1).max(30);

// ID matcher
const id = () => reference().required();

// String matcher
const string = () => Joi.string().allow("").min(0).max(256);

// Boolean matcher
const boolean = () => Joi.boolean().required();

// Number matcher
const number = () => Joi.number().required();

// Numeric range matcher
const numericRange = (min, max) => number().min(min).max(max);

// Array matcher
const array = (items) => Joi.array().items(items);

// Array of registrations matcher
const arrayOfRegistrations = () => array(Joi.number());

// Array of IDs matcher
const arrayOfIds = () => array(reference());

// Date matcher
const date = () => Joi.date().iso();

// Final date of an interval matcher
const finalDate = (initialDateName) =>
  Joi.date().iso().greater(Joi.ref(initialDateName));

/**
 *
 * @param {String} modelName model reference
 * @param {string} key attribute
 * @param {string} type attribute type
 * @param {string} isArray consider attribute as a array
 * @param {string} required consider required attribute
 */
const foreingKey = (modelName, key, type, isArray = false, required = true) => {
  const mongoose = require("mongoose");
  const item = {
    type,
    validate: {
      validator: (v) => validateForeingKey(mongoose.model(modelName), key, v),
      message: (props) => `${props.value} doesn't exist`,
    },
  };
  if (isArray) {
    return {
      type: [item],
      ref: modelName,
      required,
      default: [],
    };
  }
  return { ...item, ref: modelName, required };
};

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
  foreingKey,
};
