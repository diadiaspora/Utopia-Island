require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const methodOverride = require("method-override");
// logging middleware
const morgan = require("morgan");
const session = require("express-session");

const port = process.env.PORT || 3000;

const authController = require("./controllers/auth.js");
const citizensController = require("./controllers/citizens.js");
const Citizen = require("./models/citizen.js");

mongoose.connect(process.env.MONGODB_URI);


mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});


app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

app.use(morgan("dev"));


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// If a user is logged in, add the user's doc to req.user and res.locals.user
app.use(require("./middleware/add-user-to-req-and-locals"));

app.use("/auth", authController);
app.use("/citizens", citizensController);

// Routes below

// GET / (root/default) -> Home Page
app.get("/", async (req, res) => {
  const foundCitizen = await Citizen.findById(req.params.citizenId);
  const allCitizens = await Citizen.find({});
 
  res.render("home.ejs", {
    citizen: foundCitizen,
    citizens: allCitizens,
  });
});



app.use("/auth", require("./controllers/auth"));

app.use("/unicorns", require("./controllers/unicorns"));

app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
