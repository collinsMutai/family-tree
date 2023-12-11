const mongoose = require("mongoose");
const { Schema } = mongoose;

const ParentsSchema = new Schema({
  parentName: { type: mongoose.Schema.Types.ObjectId, ref: "GrandParents" },
  name: { type: String, required: true },
  firstWifeName: { type: String },
  secondWifeName: { type: String },
  thirdWifeName: { type: String },
  firstWifeChildren: { type: Array },
  secondWifeChildren: { type: Array },
  thirdWifeChildren: { type: Array },
  husbandName: String
});

module.exports = mongoose.model("Parents", ParentsSchema);
