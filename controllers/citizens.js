const express = require("express");
const router = express.Router();

const User = require("../models/user.js");
const Citizen = require("../models/citizen.js");

router.get("/", async (req, res) => {
  const userId = req.session.userId;
  const allCitizens = await Citizen.find({ user: userId });
  res.render("citizens/index.ejs", { citizens: allCitizens });
});

router.get("/new", async (req, res) => {
  const userId = req.session.userId;
  const allCitizens = await Citizen.find({ user: userId });
  res.render("citizens/new.ejs", { citizens: allCitizens });
});

router.get("/:citizenId", async (req, res) => {
  const userId = req.session.userId;
  const foundCitizen = await Citizen.findById(req.params.citizenId);
  let citizens;

  if (userId) {
    // Show only citizens belonging to the logged-in user
    citizens = await Citizen.find({ user: userId });
  } else {
    // Show only default citizens (those without a user)
    citizens = await Citizen.find({ user: null });
  }

  res.render("citizens/show.ejs", {
    citizen: foundCitizen,
    citizens: citizens,
  });
});

router.get("/:citizenId/edit", async (req, res) => {
  const userId = req.session.userId;
  const foundCitizen = await Citizen.findById(req.params.citizenId);

  let citizens;
  if (userId) {
    citizens = await Citizen.find({ user: userId });
  } else {
    citizens = await Citizen.find({ user: null });
  }

  res.render("citizens/edit.ejs", {
    citizen: foundCitizen,
    citizens: citizens,
  });
});

router.post("/", async (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).send("You must be signed in to add a citizen.");
  }

  await Citizen.create({ ...req.body, user: userId });
  res.redirect("/citizens");
});

router.put("/:citizenId", async (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).send("You must be signed in to edit a citizen.");
  }

  const citizen = await Citizen.findById(req.params.citizenId);

  if (!citizen) {
    return res.status(404).send("Citizen not found.");
  }

  if (!citizen.user || citizen.user.toString() !== userId) {
    return res.status(403).send("You are not allowed to edit this citizen.");
  }

  await Citizen.findByIdAndUpdate(req.params.citizenId, req.body);

  res.redirect("/citizens");
});

router.delete("/:citizenId", async (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).send("You must be signed in to delete a citizen.");
  }

  const citizen = await Citizen.findById(req.params.citizenId);

  if (!citizen) {
    return res.status(404).send("Citizen not found.");
  }

  // Check ownership
  if (!citizen.user || citizen.user.toString() !== userId) {
    return res.status(403).send("You are not allowed to delete this citizen.");
  }

  await Citizen.findByIdAndDelete(req.params.citizenId);
  res.redirect("/citizens");
});

module.exports = router;
