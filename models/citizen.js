const express = require("express");






const mongoose = require("mongoose");

// router logic will go here - will be built later on in the lab

const citizenSchema = new mongoose.Schema({
    name: String,
    formerRole: String,
    currentRole: String,
    reason: String,
    rating: Number,
  });

  const Citizen = mongoose.model("citizen", citizenSchema); // create model



module.exports = Citizen;


