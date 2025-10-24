const mongoose = require("mongoose");

const citizenSchema = new mongoose.Schema({
  name: String,
  formerRole: String,
  currentRole: String,
  reason: String,
  rating: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
    default: null,
  },
});

const Citizen = mongoose.model("Citizen", citizenSchema); // create model
module.exports = Citizen;
