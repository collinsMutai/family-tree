const mongoose = require("mongoose");
const { Schema } = mongoose;

const DaughtersSchema = new Schema({
  name: { type: String, required: true, ref: "Parents" },
  husbandsName: { type: String },
  sons: { type: Array },
  daughters: { type: Array },
});

module.exports = mongoose.model("Daughters", DaughtersSchema);
