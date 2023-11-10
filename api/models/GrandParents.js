const mongoose = require("mongoose");
const { Schema } = mongoose;

const GrandParentsSchema = new Schema({
  name: { type: String, required: true },
  firstWifeName: { type: String },
  secondWifeName: { type: String},
  children: { type: Array }
  
});

module.exports = mongoose.model("GrandParents", GrandParentsSchema);
