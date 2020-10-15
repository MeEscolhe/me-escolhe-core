function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }

  return true;
}
/**
 * @author Diego Amancio <diego.amancio1998@gmail.com>
 * abstract to find by id and update
 * @param {Object} schema
 * @param {String} dataId
 * @param {Object} data
 */
const updateObject = (schema, dataId, data) => {
  const mongoose = require("mongoose");
  return schema.findByIdAndUpdate(mongoose.Types.ObjectId(dataId), data, {
    new: true,
  });
};
/**
 * @author Diego Amancio <diego.amancio1998@gmail.com>
 * checks if the requisition body is invalid according to the given controller
 *
 * @param {object} body request body
 * @param {object} controller controller given for example student,lab
 *
 * @typedef {{error: boolean, message: string}} validateResponse
 * @returns {validateResponse}
 */
const validate = (body, controller) => {
  const validation = controller.validate(body);
  return validation && validation.details && validation.details.length > 0
    ? { error: true, message: validation.details[0].message }
    : { error: false };
};
/**
 * @author Diego Amancio <diego.amancio1998@gmail.com>
 * filter null props from request body
 *
 * @param {Object} data request body
 * @param {Array.<String>} propsToFilter props Tto filter
 * @param {Boolean} conditionFunction function to apply more conditions in filter
 * @returns {object}
 */
const filterProps = (data, propsToFilter, conditionFunction) =>
  Object.entries(data).reduce((accumulate, [key, value]) => {
    if (propsToFilter.includes(key) && conditionFunction(key, value))
      accumulate[key] = value;
    return accumulate;
  }, {});
/**
 * get selection from phase id
 * @param {string} phaseId
 *
 */
const getSelectionFromPhase = (phaseId) => {
  const Phase = require("../models/phase").Phase;
  const Selection = require("../models/selection").Selection;
  return Phase.findById(phaseId).then((phase) => {
    return phase
      ? Selection.findById(phase.selectionId).then((selection) => {
          const { _id, role, description, phases, current } = selection;
          return selection
            ? {
                phaseId: phaseId,
                selectionId: _id,
                role,
                description,
                phases,
                current,
              }
            : { error: "selection " + phase.selectionId + " not found" };
        })
      : { error: "phase " + phaseId + " not found" };
  });
};
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
            `FK Constraint 'checkObjectsExists' for '${key.toString()}' failed`
          )
        );
    });
  });
};
module.exports = {
  validate,
  isEmpty,
  filterProps,
  getSelectionFromPhase,
  FKHelper,
  updateObject,
};
