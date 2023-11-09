const mongoose = require("mongoose");
const { Schema } = mongoose;

const SonsSchema = new Schema({
  parentName: { type: mongoose.Schema.Types.ObjectId, ref: "Parents" },
  name: { type: String, required: true, ref: "Parents" },
  wifeName: { type: String },
  sons: { type: Array },
  daughters: { type: Array },
});

module.exports = mongoose.model("Sons", SonsSchema);
