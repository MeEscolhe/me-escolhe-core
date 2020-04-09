// Importing dependences
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

// Creating schema
const SelectionSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    default: "",
  },
  phases: {
    type: [String],
    required: true,
    default: [],
  },
  current: {
    type: Boolean,
    required: true,
    default: true,
  },
});

// Adding paginate plugin
SelectionSchema.plugin(mongoosePaginate);

// Exporting to controllers
mongoose.model("Selection", SelectionSchema);
