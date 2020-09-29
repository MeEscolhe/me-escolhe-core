function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }

  return true;
}

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
 * @typedef {{registration: number,name: string,email: string,cra: number,description:string,skills:array,experiences: array,phases: array}} StudentSchema
 * @param {StudentSchema} props request body
 *
 * @returns {object}
 */
const filterProps = (props) =>
  Object.entries(props).reduce((accumulate, [key, value]) => {
    if (
      (key !== "registration" && value) ||
      (key === "description" && value === "")
    )
      accumulate[key] = value;

    return accumulate;
  }, {});
/**
 * get selection from phase id
 * @param {string} phaseId
 *
 */
const getSelectionFromPhase = (phaseId) => {
  const Phase = require("../models/phase");
  const Selection = require("../models/selection");

  return Phase.findById(phaseId).then((phase) =>
    phase
      ? Selection.findById(phase.selectionId).then((selection) =>
          selection
            ? { phaseId, ...selection }
            : { error: "selection " + phase.selectionId + " not found" }
        )
      : { error: "phase " + phaseId + " not found" }
  );
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
};
