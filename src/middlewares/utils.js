"use strict";

/**
 * @author Diego Amancio <diego.amancio1998@gmail.com>
 * @author Amintas Victor <amintas.pereira@ccc.ufcg.edu.br>
 *
 * Validate request body by controller
 *
 * @param {object} body
 * @param {object} controller
 * @returns {error} error, if is invalid request body
 */
const validate = (body, controller) => {
  const error = controller.validate(body);
  if (error) throw Error(error.details[0].message);
};

/**
 * @author Amintas Victor <amintas.pereira@ccc.ufcg.edu.br>
 * Check if an array is empty
 * @param {Array} schema
 * @param {String} dataId
 * @param {Object} data
 */
const isEmpty = (array) => array && array.length === 0;

/**
 * @author Amintas Victor <amintas.pereira@ccc.ufcg.edu.br>
 * Add a new attribute and remove an old attribute
 * @param {Object} object
 * @param {String} oldAttribute
 * @param {String} newAttribute
 * @param {any} newValue
 * @returns {Object} updated object
 */
const overrideAttribute = (object, oldAttribute, newAttribute, newValue) => {
  object[newAttribute] = newValue;
  delete object[oldAttribute];
  return object;
};

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

module.exports = {
  validate,
  isEmpty,
  overrideAttribute,
  getSelectionFromPhase,
  updateObject,
};
