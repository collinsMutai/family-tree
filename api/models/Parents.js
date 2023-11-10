const mongoose = require("mongoose");
const { Schema } = mongoose;

const ParentsSchema = new Schema({
  parentName: { type: mongoose.Schema.Types.ObjectId, ref: "GrandParents" },
  name: { type: String, required: true },
  firstWifeName: { type: String },
  secondWifeName: { type: String },
  children: { type: Array },
});

module.exports = mongoose.model("Parents", ParentsSchema);
