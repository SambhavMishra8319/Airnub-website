// =========================
// 📁 routes/listing.js
// =========================

// Import required modules
const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listings");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync.js");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

// =========================
// 🏡 LISTINGS ROUTES
// =========================

// 🔹 All listings (GET) | Create new listing (POST)
router
  .route("/")
  .get(wrapAsync(listingController.index)) // Show all listings
  .post(
    isLoggedIn,
    validateListing,
    upload.single("listing[image]"),
    wrapAsync(listingController.create) // Create new listing
  );

// 🔹 Form to create new listing
router.get("/new", isLoggedIn, listingController.new);

// 🔹 Routes for specific listing ID
router
  .route("/:id")
  .get(wrapAsync(listingController.show)) // Show listing details
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.update) // Update listing
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.delete)); // Delete listing

// 🔹 Form to edit a listing
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.edit));

// Export router
module.exports = router;




/*
===========================================================
📄 FILE SUMMARY: routes/listing.js
===========================================================

🧭 PURPOSE:
This file defines all the Express routes related to "Listings" 
in the Wanderlust web app — including creation, retrieval, 
updating, and deletion of property listings.

⚙️ FUNCTIONALITY & WORKFLOW:
1. Imports necessary modules and middleware:
   - Express router for route handling.
   - listingController for route logic.
   - Middleware for authentication (isLoggedIn), 
     ownership verification (isOwner), and data validation (validateListing).
   - Multer for image uploads, integrated with Cloudinary storage.

2. Route Definitions:
   • GET "/" → Display all listings.
   • POST "/" → Create a new listing (requires login, validation, and image upload).
   • GET "/new" → Show form to create a new listing (only for logged-in users).
   • GET "/:id" → Show details of a specific listing.
   • PUT "/:id" → Update listing details (only owner can edit; supports image upload).
   • DELETE "/:id" → Delete a listing (only owner can delete).
   • GET "/:id/edit" → Show form to edit a listing (only owner can access).

🧩 KEY MIDDLEWARE USED:
- `isLoggedIn`: Ensures only authenticated users can create/edit/delete.
- `isOwner`: Ensures only the listing creator can modify or remove it.
- `validateListing`: Validates input data before saving to DB.
- `upload`: Handles image uploads via Multer + Cloudinary.

🚀 RESULT:
Ensures secure, validated, and structured CRUD operations 
for listings, maintaining smooth workflow and data integrity 
within the Wanderlust application.
===========================================================
*/
