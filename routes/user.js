const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapasync = require("../utils/wrapAsync.js");
const passport = require("passport");
router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

router.post(
  "/signup",
  wrapasync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registerdUser = await User.register(newUser, password);
      req.flash("success", "welcome to Wanderlust");
      res.redirect("/listings");
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  })
);

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
 
  (req, res) => {
    // req.flash("success", "Welcome back to Wanderlust!");
    // res.redirect("/listings");
    res.send("welcome to wanderlust! you sre logged in");
  }
);

console.log("User routes loaded ✅");

router.get("/login", (req, res) => {
  console.log("Login route triggered ✅");
  res.render("users/login.ejs");
});



module.exports = router;
