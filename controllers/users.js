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




/******************************************************
 * File: controllers/users.js
 * Description:
 * This controller handles all **user-related logic** for the Wanderlust application, 
 * including authentication, registration, login, and logout processes.
 *
 * 🔹 Main Responsibilities:
 * 1. Render authentication forms (signup & login).
 * 2. Handle user registration and secure password storage via Passport-Local Mongoose.
 * 3. Manage user login and session handling with Passport.
 * 4. Handle user logout and session cleanup.
 * 5. Use flash messages to give user feedback (success/error).
 *
 * 🔄 Workflow:
 *  - renderSignupForm → Renders signup form for new users.
 *  - signup → Creates new user account:
 *      - Extracts `username`, `email`, and `password` from the form.
 *      - Uses `User.register()` (from passport-local-mongoose) to hash password & save user.
 *      - Automatically logs in the user after signup using `req.login()`.
 *      - Redirects to the previous URL (if stored in session) or `/listings` by default.
 *  - loginForm → Displays the login form page.
 *  - login → Triggered after Passport authenticates credentials:
 *      - Displays a flash message.
 *      - Redirects user to stored URL or `/listings`.
 *  - logout → Logs out current user via `req.logout()` and redirects to listings.
 *
 * ✅ Strengths:
 * - Proper async error handling using `wrapAsync` and try/catch.
 * - Clean session redirect logic to restore last visited page.
 * - Follows Passport’s best practices for authentication flows.
 *
 * ⚠️ Potential Issues / Improvements:
 * 1. **wrapAsync not used in logout or login** — these are short sync functions, so not an error,
 *    but wrapping logout in try/catch could handle rare async errors more safely.
 * 2. **Error message leakage** — `e.message` from Mongo or Passport errors might reveal internal info.
 *    You can replace it with a user-friendly message like:
 *       `req.flash("error", "Registration failed. Try again!")`
 * 3. Ensure that `User` model includes Passport-Local Mongoose plugin (`User.register()` depends on it).
 * 4. Make sure `req.session.redirectUrl` is always cleared after redirection (which you already did 👍).
 *
 * 💡 Optional Enhancements:
 * - Add email validation before saving (regex check or validator library).
 * - Add rate limiting for login attempts to prevent brute force.
 ******************************************************/
