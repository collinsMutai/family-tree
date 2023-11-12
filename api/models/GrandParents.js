const mongoose = require("mongoose");
const { Schema } = mongoose;

const GrandParentsSchema = new Schema({
  name: { type: String, required: true },
  firstWife: { type: String },
  secondWife: { type: String},
  children: { type: Array },
  addedPhotos: {type: Array}
  
});

module.exports = mongoose.model("GrandParents", GrandParentsSchema);
