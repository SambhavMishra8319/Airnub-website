const express = require("express");
const router = express.Router();
const passport = require("passport");
const usersController = require("../controllers/users");
const { saveRedirectUrl } = require("../middleware");

// 🧾 Signup
router
  .route("/signup")
  .get(usersController.renderSignupForm)
  .post(usersController.signup);

// 🧾 Login
router
  .route("/login")
  .get(usersController.loginForm)
  .post(
    saveRedirectUrl, // save the page user tried to access
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    usersController.login
  );

// 🧾 Logout
router.get("/logout", usersController.logout);

module.exports = router;
