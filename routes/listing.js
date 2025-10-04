const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");

// Middleware for validation
const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// List all listings
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const alllistings = await Listing.find({});
    res.render("listings/index.ejs", { alllistings });
  })
);

// Show form to create new listing
router.get("/new", (req, res) => {
  res.render("listings/new");
});

// Create new listing
router.post(
  "/",
  validateListing,
  wrapAsync(async (req, res) => {
    const newlisting = new Listing(req.body.listing);
    await newlisting.save();
    req.flash("success","Successfully made a new listing!");
    res.redirect("/listings");
  })
);

// Show form to edit existing listing
router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      // throw new ExpressError(404, "Listing not found");
    req.flash("error","Listing you requested does not exists!");
    res.redirect("/listings");
    }res.render("listings/edit.ejs", { listing });
  })
);

// Update existing listing
router.put(
  "/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    // if (!listing) throw new ExpressError(404, "Listing not found");
   if (!listing) {
      // throw new ExpressError(404, "Listing not found");
    req.flash("error","Listing you requested does not exists!");
    res.redirect("/listings");
    }
    req.flash("success","Successfully upadate new listing!");
    res.redirect(`/listings/${id}`);
  })
);

// Show details of a single listing
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if (!listing) throw new ExpressError(404, "Listing not found");
    res.render("listings/show.ejs", { listing });
  })
);

// Delete a listing
router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const deletedlisting = await Listing.findByIdAndDelete(id);
    if (!deletedlisting) throw new ExpressError(404, "Listing not found");
    req.flash("success","Successfully delete a listing!");
    res.redirect("/listings");
  })
);

module.exports = router;
