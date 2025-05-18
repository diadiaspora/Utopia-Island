const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Schema = mongoose.Schema;



// Citizen Schema
// const citizenSchema = new Schema(
//   {
//     celebrityName: {
//       type: String,
//       required: true,
//     },
//     formerPosition: {
//       type: String,
//       required: true,
//     },
//     newPosition: {
//       type: String,
//       required: true,
//     },
//     rating: {
//       type: Number,
//       min: 1,
//       max: 10,
//       default: 5,
//     },
//     summary: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// ); // Add timestamps here

// User Schema
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
   
  },
  { timestamps: true }
); // Add timestamps here


// Export the model
const User = mongoose.model("User", userSchema);
module.exports = User;
