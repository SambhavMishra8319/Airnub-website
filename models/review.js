const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//creating schema
const reviewSchema = new Schema({
  comment: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
   author: {
    type: Schema.Types.ObjectId,
    ref: "User", 
  },
});

module.exports =mongoose.model("Review",reviewSchema) ;



/******************************************************
 * File: models/review.js
 * Description:
 * Defines the Mongoose schema and model for **Reviews** in the Wanderlust app.
 * Each review represents user feedback left on a specific listing.
 *
 * 🔹 Main Responsibilities:
 * 1. Structure how reviews are stored in MongoDB.
 * 2. Define relationships between reviews and their authors (Users).
 * 3. Validate ratings and timestamps for consistency.
 *
 * 🧩 Schema Fields:
 * - comment (String): Textual feedback provided by the user.
 * - rating (Number): Rating score between 1 and 5.
 * - createdAt (Date, default: current date): Automatically records when the review was created.
 * - author (ObjectId): References the `User` who wrote the review.
 *
 * 🧠 Usage:
 * - Used in the `Listing` model to associate reviews with listings.
 * - Populated in controllers (e.g., `.populate("author")`) to show reviewer details.
 * - Automatically removed when associated listing is deleted (handled in `listing.js`).
 ******************************************************/
