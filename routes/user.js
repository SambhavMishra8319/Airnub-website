const express = require("express");
const router = express.Router();
const passport = require("passport");
const usersController = require("../controllers/users");
const { saveRedirectUrl } = require("../middleware");

// Signup
router.get("/signup", usersController.renderSignupForm);
router.post("/signup", usersController.signup);

// Login
router.get("/login", usersController.loginForm);
router.post(
  "/login",
  saveRedirectUrl, // save the page user tried to access
  passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),
  usersController.login
);

// Logout
router.get("/logout", usersController.logout);

module.exports = router;
