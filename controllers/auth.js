const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Citizen = require("../models/citizen");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 6;

const defaultCitizens = [
  {
    name: "Cleopatra",
    formerRole: "Pharaoh",
    currentRole: "Lead Diplomat",
    reason:
      "Cleopatra was chosen for her proven leadership skills in democracy. She also adds to the overall aesthetic of the society. She will likely be in charge of presentation and foreign relations.",
    rating: 5,
  },
  {
    name: "Gandhi",
    formerRole: "Political Ethicist",
    currentRole: "Peacekeeper",
    reason:
      "Gandhi was chosen for his unwavering dedication to peace and justice. He brings a moral compass to the society and nonviolent leadership. He will oversee ethics, conflict resolution, and civic harmony.",
    rating: 5,
  },
  {
    name: "James Brown",
    formerRole: "Entertainer",
    currentRole: "Civilian",
    reason:
      "James Brown was chosen for his cultural impact and innovation in music. He brings energy, creativity, and a strong work ethic. He will be a civilian.",
    rating: 5,
  },
  {
    name: "Greta Thunberg",
    formerRole: "Activist",
    currentRole: "Climate Control",
    reason:
      "Greta Thunberg was chosen for her advocacy and environmental leadership. She brings urgency, integrity, and long-term vision to the society. She will likely oversee sustainability and climate policy.",
    rating: 5,
  },
  {
    name: "Charles Darwin",
    formerRole: "Geologist",
    currentRole: "Marine Biology",
    reason:
      "Charles Darwin was chosen for his contributions to science. He brings curiosity, logic, and a spirit of discovery. He will likely oversee innovation, scientific inquiry, and evolutionary education.",
    rating: 5,
  },
  {
    name: "Rocky Balboa",
    formerRole: "Boxer",
    currentRole: "Military",
    reason:
      "Rocky Balboa was chosen for his resilience and unwavering determination. He brings strength, humility, and a never-quit attitude to the society. He will likely oversee the military.",
    rating: 5,
  },
  {
    name: "Yoda",
    formerRole: "Jedi Grand Master",
    currentRole: "Therapist",
    reason:
      "Yoda was chosen for his deep wisdom, spiritual insight, and mastery of discipline. He brings calm and guidance to the society. He will likely oversee education, meditation, and philosophical development.",
    rating: 5,
  },
  {
    name: "Lady Gaga",
    formerRole: "Entertainer",
    currentRole: "Entertainment",
    reason:
      "Lady Gaga was chosen for her creativity and reinvention of pop culture. She brings inclusivity and fearless expression to the society. She will likely oversee cultural affairs and the arts.",
    rating: 5,
  },
  {
    name: "Anthony Bordain",
    formerRole: "Chef",
    currentRole: "Food & Drug Administration",
    reason:
      "Anthony Bourdain was chosen for his curiosity, and global perspective. He brings cultural awareness, authenticity, and connection through food to the society. He will likely oversee culinary exploration.",
    rating: 5,
  },
];

router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs", { error: "" });
});

router.post("/sign-up", async (req, res) => {
  try {
    if (req.body.password !== req.body.confirmPassword) {
      throw new Error("Passwords Do Not Match");
    }

    req.body.password = bcrypt.hashSync(req.body.password, SALT_ROUNDS);

    const user = await User.create(req.body);

    req.session.userId = user._id;

    const existingCitizens = await Citizen.find({ user: user._id });
    if (existingCitizens.length === 0) {
      const citizensToCreate = defaultCitizens.map((citizen) => ({
        ...citizen,
        user: user._id,
      }));
      await Citizen.insertMany(citizensToCreate);
    }

    // 7. Redirect
    res.redirect("/");
  } catch (err) {
    if (err.message.includes("duplicate key")) {
      err.message = "User Already Exists";
    }
    res.render("auth/sign-up.ejs", { error: err.message });
  }
});

router.get("/sign-in", (req, res) => {
  res.render("auth/sign-in.ejs", { error: "" });
});

router.post("/sign-in", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const isValidPassword = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isValidPassword) throw new Error();
    req.session.userId = user._id;
    res.redirect("/citizens");
  } catch {
    res.render("auth/sign-in.ejs", { error: "Invalid Credentials" });
  }
});

router.get("/sign-out", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
