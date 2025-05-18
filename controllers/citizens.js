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

router.get("/edit", async (req, res) => {
  res.send("show form for editing specific users profile ");
  // res.render("citizens/edit.ejs");
});

router.post("/", async (req, res) => {
  await Citizen.create(req.body);
  res.redirect("/citizens/new");
});

// router logic will go here - will be built later on in the lab

module.exports = router;
