const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

require("./config/Mongoose")();
const { swaggerServe, swaggerSetup } = require("./config/swagger/Swagger");
app.use(express.static("public"));
app.use("/static", express.static("public"));

app.use(cors());

const {
  labs,
  selections,
  projects,
  students,
  teachers,
  credential,
} = require("./Router");

mongoose.set("useFindAndModify", false);
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

app.use(express.json());
app.use("/labs", labs);
app.use("/auth", credential);
app.use("/selections", selections);
app.use("/projects", projects);
app.use("/students", students);
app.use("/teachers", teachers);
app.use("/docs", swaggerServe, swaggerSetup);

const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV;

app.listen(port, () =>
  console.log(`Running in ${env} environment. Listening on port ${port}...`)
);
