const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const listingcontroller=require("../controllers/listings");
// List all listings
router.get(
  "/",
  wrapAsync(listingcontroller.index)
);

// Show form to create new listing
router.get("/new", isLoggedIn, listingcontroller.new);

// Create new listing
router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(listingcontroller.create)
);

// Show form to edit existing listing
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingcontroller.edit)
);

// Update existing listing
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(listingcontroller.update)
);

// Show details of a single listing
router.get(
  "/:id",
  wrapAsync(listingcontroller.show)
);

// Delete a listing
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingcontroller.delete)
);

module.exports = router;
