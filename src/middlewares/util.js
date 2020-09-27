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
    if (value || (key === "description" && value === ""))
      accumulate[key] = value;

    return accumulate;
  }, {});
module.exports = {
  validate,
  isEmpty,
  filterProps,
};
