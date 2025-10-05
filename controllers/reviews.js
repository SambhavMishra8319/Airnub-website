const express = require("express");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const ExpressError = require("../utils/ExpressError.js");




module.exports.postReview = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) throw new ExpressError(404, "Listing not found");

    const newReview = new Review(req.body.review);
    newReview.author = req.user._id; // ✅ associate user

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    req.flash("success", "New review added!");
    res.redirect(`/listings/${listing._id}`);
  }

  module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted!");
    res.redirect(`/listings/${id}`);
  }
  