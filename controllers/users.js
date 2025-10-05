const User = require("../models/user");
const passport = require("passport");

// Render Signup Form
module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

// Signup logic
module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);

    // Log in the user after signup
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Wanderlust!");
      const redirectUrl = req.session.redirectUrl || "/listings";
      delete req.session.redirectUrl; // clear redirect
      res.redirect(redirectUrl);
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

// Render Login Form
module.exports.loginForm = (req, res) => {
  res.render("users/login.ejs");
};

// Login logic
module.exports.login = (req, res) => {
  req.flash("success", "Welcome back to Wanderlust!");
  const redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

// Logout logic
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  });
};
