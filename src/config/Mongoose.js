const mongoose = require("mongoose");

/**
 * setting mongoDb connection
 */
const connect = () => {
  require("dotenv/config");

  switch (process.env.NODE_ENV) {
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
  }

  mongoose.set("useCreateIndex", true);
};

module.exports = connect;
