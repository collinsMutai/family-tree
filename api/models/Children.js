const mongoose = require("mongoose");
const { Schema } = mongoose;

const ChildrenSchema = new Schema({
  grandParentName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GrandParents",
  },
  parentName: { type: mongoose.Schema.Types.ObjectId, ref: "Parents" },
  name: { type: String, required: true, ref: "Parents" },
  wifeName: { type: String },
  children: { type: Array },
});

module.exports = mongoose.model("Children", ChildrenSchema);
