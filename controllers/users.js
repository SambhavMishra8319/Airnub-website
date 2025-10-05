const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");

// Render signup form
module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

// Signup logic
module.exports.signup = wrapAsync(async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Wanderlust!");
      const redirectUrl = req.session.redirectUrl || "/listings";
      delete req.session.redirectUrl;
      res.redirect(redirectUrl);
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
});

// Render login form
module.exports.loginForm = (req, res) => {
  res.render("users/login.ejs");
};

// Login logic (after Passport authentication)
module.exports.login = (req, res) => {
  req.flash("success", `Welcome back, ${req.user.username}!`);
  const redirectUrl = req.session.redirectUrl || "/listings";
  delete req.session.redirectUrl;
  res.redirect(redirectUrl);
};

// Logout
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "You have logged out!");
    res.redirect("/listings");
  });
};
