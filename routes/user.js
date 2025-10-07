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



/*
===========================================================
📄 FILE SUMMARY: routes/users.js
===========================================================

🧭 PURPOSE:
This file defines all **user authentication routes** for the Wanderlust app,
including signup, login, and logout functionality.  
It connects the routes to controller logic and integrates Passport.js 
for authentication.

⚙️ FUNCTIONALITY & WORKFLOW:
1. Imports:
   - `express` → For routing.
   - `passport` → For handling authentication.
   - `usersController` → Contains logic for rendering forms and managing login/signup.
   - `saveRedirectUrl` → Middleware that saves the original page user tried to visit before login.

2. Route Definitions:
   • `/signup`
     - GET → Renders the signup form.
     - POST → Registers a new user and logs them in immediately after registration.

   • `/login`
     - GET → Renders the login form.
     - POST → 
         → Runs `saveRedirectUrl` to remember the user’s intended destination.
         → Uses Passport’s local strategy for authentication.
         → On failure → redirects to `/login` with a flash message.
         → On success → redirects to previously saved or default page.

   • `/logout`
     - GET → Logs out the user, flashes a success message, and redirects to `/listings`.

🧩 KEY MIDDLEWARE USED:
- `passport.authenticate("local")`: Verifies username/password credentials.
- `saveRedirectUrl`: Stores attempted route before authentication.

🚀 RESULT:
Handles complete user authentication flow:
Signup → Login → Logout, with smooth redirects and secure session handling.

===========================================================
*/
