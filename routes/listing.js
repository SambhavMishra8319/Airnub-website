const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listings");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync.js");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

// ====== LISTINGS ROUTES ======

// Root /listings route
router
  .route("/")
  .get(wrapAsync(listingController.index)) // List all listings
  .post(isLoggedIn, validateListing, upload.single("listing[image]"),wrapAsync(listingController.create)); // Create new listing
  
// Form to create a new listing
router.get("/new", isLoggedIn, listingController.new);

// Routes for specific listing ID
router
  .route("/:id")
  .get(wrapAsync(listingController.show)) // Show listing details
  .put(
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.update)
  ) // Update listing
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.delete)); // Delete listing

// Form to edit listing
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.edit));

module.exports = router;
