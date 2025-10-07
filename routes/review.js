
const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
// const { reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { isLoggedIn, isReviewAuther } = require("../middleware.js");
const { validateReview } = require("../middleware.js");
const reviewcontrollers=require("../controllers/reviews.js");

// 🧾 Create a review for a listing
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewcontrollers.postReview)
);

// 🧾 Delete a review
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuther,
  wrapAsync(reviewcontrollers.deleteReview)
);

module.exports = router;



/*
===========================================================
📄 FILE SUMMARY: routes/reviews.js
===========================================================

🧭 PURPOSE:
This file defines all the Express routes related to "Reviews" 
that belong to specific listings in the Wanderlust application.
It allows users to create and delete reviews for listings.

⚙️ FUNCTIONALITY & WORKFLOW:
1. Uses `mergeParams: true` so the router can access the parent 
   route parameters (i.e., listing ID from `/listings/:id/reviews`).

2. Imports:
   - Express Router and async handler (wrapAsync) for error handling.
   - Listing and Review models for database operations.
   - Middleware for authentication (`isLoggedIn`), authorization (`isReviewAuther`), 
     and input validation (`validateReview`).
   - Controller (`reviewcontrollers`) containing the actual logic for reviews.

3. Route Definitions:
   • POST "/" → Create a new review for a listing.
        - Requires user to be logged in.
        - Validates the review data.
        - Calls `reviewcontrollers.postReview` for DB logic.

   • DELETE "/:reviewId" → Delete an existing review.
        - Requires user to be logged in.
        - Ensures the logged-in user is the author of the review.
        - Calls `reviewcontrollers.deleteReview` for DB deletion.

🧩 KEY MIDDLEWARE USED:
- `isLoggedIn`: Ensures the user is authenticated.
- `validateReview`: Validates incoming review data (rating, comment).
- `isReviewAuther`: Ensures only the original author can delete a review.

🚀 RESULT:
Provides secure and structured routes for managing reviews tied 
to listings. Maintains user accountability and data integrity 
within the Wanderlust application.
===========================================================
*/
