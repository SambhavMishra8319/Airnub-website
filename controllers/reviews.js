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
  


  /*
  File: controllers/review.js
  Purpose:
    - This controller handles all review-related logic for the Wanderlust application.
    - It manages adding new reviews to listings and deleting existing ones.
  
  Workflow & Functionality:
    1. **Dependencies:**
       - express: for route handling (indirectly used through Express Router in routes).
       - Listing model: used to find and update listings when reviews are added or removed.
       - Review model: used to create and delete review documents.
       - ExpressError: custom error class for handling application-level errors gracefully.
    
    2. **Functions Exported:**
       - `postReview`: 
         • Fetches the listing by its ID (from URL parameters).  
         • Throws a 404 error if listing doesn’t exist.  
         • Creates a new `Review` object using data from the request body (`req.body.review`).  
         • Sets the `author` of the review as the currently logged-in user (`req.user._id`).  
         • Pushes the review into the `listing.reviews` array (relationship established in the model).  
         • Saves both the `Review` and updated `Listing`.  
         • Uses `req.flash` to show a success message and redirects to the listing’s detail page.
       
       - `deleteReview`:
         • Extracts listing and review IDs from URL parameters.  
         • Updates the `Listing` to remove the reference to that review (`$pull` operation).  
         • Deletes the `Review` document from the database.  
         • Shows a flash success message and redirects to the same listing page.
    
    3. **Error Handling:**
       - If a listing is not found while posting a review, an `ExpressError` with status 404 is thrown.
       - Other errors are expected to be caught by global error-handling middleware.

  Overall Summary:
    - This controller ensures that reviews are properly linked to their listings and users.
    - It maintains database integrity by updating both listing and review collections consistently.
*/
