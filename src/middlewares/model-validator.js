const Joi = require("joi");

const validate = (keys, model) => {
  const validator = Joi.object().keys(keys);
  return validator.validate(model);
};

const reference = () => Joi.string().min(1).max(30);

const id = () => reference().required();

const string = () => Joi.string().allow("").min(0).max(256).required();

const boolean = () => Joi.boolean().required();

const number = () => Joi.number().required();

const numericRange = (min, max) => number().min(min).max(max);

const array = (items) => Joi.array().items(items).required();

const arrayOfRegistrations = () => array(Joi.number());

const arrayOfIds = () => array(reference());

const date = () => Joi.date().iso().required();

const finalDate = (initialDateName) =>
  Joi.date().iso().greater(Joi.ref(initialDateName)).required();
/**
 * Validate foreing key to model
 * @param {object} model
 * @param {string} type is object's prop
 * @param {object} key key value
 * @returns {promise}
 */
const FKHelper = (model, type, key) => {
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
/**
 *
 * @param {boolean} isArray
 * @param {string} modelName
 * @param {string} key
 * @param {string} type
 */
const foreingKeyValidatorSchema = (
  modelName,
  key,
  type,
  isArray = false,
  required = true
) => {
  const mongoose = require("mongoose");
  const item = {
    type,
    validate: {
      validator: (v) => FKHelper(mongoose.model(modelName), key, v),
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
  foreingKeyValidatorSchema,
  FKHelper,
};
