const mongoose = require("mongoose");
/**
 * setting mongoDb connection
 */
const connect = () => {
  mongoose.connect(
    "mongodb+srv://admin:Me-escolhe-p1-p2@me-escolhe.szvxg.gcp.mongodb.net/me-escolhe?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  mongoose.set("useCreateIndex", true);
};

module.exports = connect;
