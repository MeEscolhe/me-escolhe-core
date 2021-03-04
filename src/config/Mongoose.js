"use strict";
/**
 * @author Amintas Victor <amintas.pereira@ccc.ufcg.edu.br>
 */
const mongoose = require("mongoose");

/**
 * Setting MongoDB connection
 */
const connect = () => {
  require("dotenv/config");
  switch (process.env.NODE_ENV.trim()) {
    case "LOCAL":
      mongoose.connect(process.env.ME_ESCOLHE_LOCAL_DRIVER, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      break;
    case "DEV":
      mongoose.connect(process.env.ME_ESCOLHE_DEV_DRIVER, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      break;
    case "PROD":
      mongoose.connect(process.env.ME_ESCOLHE_PROD_DRIVER, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      break;
    case "DEMO":
      mongoose.connect(process.env.ME_ESCOLHE_DEMO_DRIVER, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      break;
    default:
      console.log("Can't recognize NODE_ENV");
  }

  mongoose.set("useCreateIndex", true);
};

module.exports = connect;
