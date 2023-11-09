const mongoose = require("mongoose");
const { Schema } = mongoose;

const ParentsSchema = new Schema({
  parentName: { type: mongoose.Schema.Types.ObjectId, ref: "GrandParents" },
  name: {type: String},
  firstWifeName: { type: String },
  secondWifeName: { type: String },
  sons: { type: Array },
  daughters: { type: Array },
});

module.exports = mongoose.model("Parents", ParentsSchema);
