

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { ref } = require("joi");
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      default:
        "https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=",
      set: (v) =>
        v === ""
          ? "https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8="
          : v,
    },
  },

  location: {
    type: String,
  },
  price: {
    type: Number,
  },
  country: {
    type: String,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
  }
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});
// create model
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;




/******************************************************
 * File: models/listing.js
 * Description:
 * Defines the Mongoose schema and model for **Listings** in the Wanderlust app.
 * Each listing represents a travel destination or accommodation entry 
 * created by users and can contain images, descriptions, prices, and reviews.
 *
 * 🔹 Main Responsibilities:
 * 1. Structure the data for listings stored in MongoDB.
 * 2. Define field types, default values, and validation requirements.
 * 3. Establish relationships with other collections (Users and Reviews).
 * 4. Automatically clean up related reviews when a listing is deleted.
 *
 * 🧩 Schema Fields:
 * - title (String, required): The title or name of the listing.
 * - description (String): Short text describing the listing.
 * - image (Object):
 *     - filename (String, default: "listingimage")
 *     - url (String, default: fallback image URL)
 *       • Includes a setter to ensure a default URL if the field is empty.
 * - location (String): The place or address of the listing.
 * - price (Number): Cost associated with the listing.
 * - country (String): Country where the listing is located.
 * - reviews ([ObjectId]): Array of references to associated `Review` documents.
 * - owner (ObjectId): Reference to the `User` who created the listing.
 *
 * 🔄 Middleware:
 * - `post("findOneAndDelete")`: Runs automatically after a listing is deleted.
 *    • Deletes all associated reviews from the `reviews` collection.
 *
 * 🧠 Usage:
 * - Imported in controllers and routes to create, read, update, and delete listings.
 * - Ensures consistent structure and relational integrity across the app.
 ******************************************************/
