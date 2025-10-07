const mongoose = require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    
  },
});

userSchema.plugin(passportLocalMongoose); // ✅ Corrected

module.exports = mongoose.model("User", userSchema);


/******************************************************
 * File: models/user.js
 * Description:
 * Defines the Mongoose schema and model for **Users** in the Wanderlust app.
 * Handles user authentication and management using Passport.js.
 *
 * 🔹 Main Responsibilities:
 * 1. Store and manage user account information.
 * 2. Integrate with Passport-Local Mongoose for authentication.
 * 3. Enable secure password hashing and validation.
 *
 * 🧩 Schema Fields:
 * - email (String, required): User’s email address (unique per account recommended).
 *
 * 🧠 Added by passport-local-mongoose:
 * - username (String): Automatically added by the plugin.
 * - hash (String): Stores the hashed password.
 * - salt (String): Used for password encryption.
 * - Utility methods for:
 *    • User registration (`User.register()`)
 *    • Authentication (`User.authenticate()`)
 *    • Password hashing and validation.
 *
 * 🧠 Usage:
 * - Used in authentication controllers (`users.js`) for signup, login, and session management.
 * - Automatically integrates with Passport middleware for authentication flow.
 ******************************************************/
