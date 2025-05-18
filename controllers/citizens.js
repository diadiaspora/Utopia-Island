// controllers/foods.js

const express = require("express");
const router = express.Router();

const User = require("../models/user.js");
const Citizen = require("../models/citizen.js");

router.get("/", async (req, res) => {
  const allCitizens = await Citizen.find({});
  console.log(allCitizens);
  res.render("citizens/index.ejs", { citizens: allCitizens });
});

router.get("/new", async (req, res) => {
  const allCitizens = await Citizen.find({});

  res.render("citizens/new.ejs", { citizens: allCitizens });
});

router.get("/:citizenId", async (req, res) => {
  const foundCitizen = await Citizen.findById(req.params.citizenId);
  const allCitizens = await Citizen.find({});



  res.render("citizens/show.ejs", { citizen: foundCitizen });
});

router.get("/:citizenId/edit", async (req, res) => {
  const foundCitizen = await Citizen.findById(req.params.citizenId);
  res.render("citizens/edit.ejs", { citizen: foundCitizen });
});

router.post("/", async (req, res) => {
  await Citizen.create(req.body);
  res.redirect("/citizens");
});

router.put("/:citizenId", async (req, res) => {
  await Citizen.findByIdAndUpdate(req.params.citizenId, req.body);
  
  res.redirect("/citizens");
});

router.delete("/citizens/:citizenId", async (req, res) => {
  await Citizen.findByIdAndDelete(req.params.citizenId);
  res.redirect("/citizens");
});

// router logic will go here - will be built later on in the lab

module.exports = router;
