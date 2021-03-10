const ObjectId = require("mongoose").Types.ObjectId;

const CleanObject = (object) => {
  for (prop in object) {
    if (!object[prop]) delete object[prop];
    else if (typeof object[prop] === "object") CleanObject(object[prop]);
  }
  return object;
};

const ObjectIdList = (objectList) =>
  objectList.map((object) => ObjectId(object));

module.exports = {
  ObjectId,
  ObjectIdList,
  CleanObject,
};
