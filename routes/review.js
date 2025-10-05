
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
