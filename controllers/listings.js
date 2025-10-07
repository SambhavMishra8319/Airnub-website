
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");

module.exports.index = async (req, res) => {
  const alllistings = await Listing.find({});
  res.render("listings/index.ejs", { alllistings });
};

module.exports.new = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.create = async (req, res) => {
  let url=req.file.path;
  let filename=req.file.filename;
  
  const newlisting = new Listing(req.body.listing);
  newlisting.owner = req.user._id;
  newlisting.image={url,filename};
  await newlisting.save();
  console.log(req.body);

  req.flash("success", "Successfully made a new listing!");
  res.redirect("/listings");
};

module.exports.edit = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id).populate("reviews").populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested does not exist!");
    return res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
};

module.exports.update = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });

  if (!listing) {
    req.flash("error", "Listing you requested does not exist!");
    return res.redirect("/listings");
  }
  if(typeof req.file !="undefined"){

    let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
  }

  req.flash("success", "Successfully updated the listing!");
  res.redirect(`/listings/${id}`);
};

module.exports.show = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  const deletedlisting = await Listing.findByIdAndDelete(id);

  if (!deletedlisting) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  req.flash("success", "Successfully deleted the listing!");
  res.redirect("/listings");
};




// module.exports.create = async (req, res) => {
//   const newlisting = new Listing(req.body.listing);
//   newlisting.owner = req.user._id;

//   if (req.file) { // ✅ safer file check
//     const { path: url, filename } = req.file;
//     newlisting.image = { url, filename };
//   }

//   await newlisting.save();
//   req.flash("success", "Successfully made a new listing!");
//   res.redirect("/listings");
// };


/**
 * ======================================================================
 * File: controllers/listings.js
 * Author: Sam
 * Project: Wanderlust
 * ======================================================================
 *
 * 📌 Purpose:
 *   This controller manages all CRUD operations related to "Listings" —
 *   the primary entities in the Wanderlust app that represent travel places,
 *   accommodations, or experiences posted by users.
 *
 *   It acts as the middle layer between the route handlers (in /routes/listings.js)
 *   and the MongoDB database (through the Listing model in /models/listing.js).
 *   It controls data fetching, modification, and rendering of the appropriate
 *   EJS templates for user interaction.
 *
 * ======================================================================
 *
 * ⚙️ Functions & Responsibilities:
 *
 * 1. index(req, res)
 *    - Fetches all listings from MongoDB using Mongoose.
 *    - Renders the 'index.ejs' template to display all listings.
 *
 * 2. new(req, res)
 *    - Renders the 'new.ejs' template containing the form
 *      to create a new listing.
 *
 * 3. create(req, res)
 *    - Handles form submission for creating a new listing.
 *    - Retrieves form data from req.body.listing.
 *    - Handles uploaded image via Multer (req.file.path & req.file.filename).
 *    - Associates the logged-in user (req.user._id) as the owner.
 *    - Saves the new listing to MongoDB and flashes a success message.
 *
 * 4. edit(req, res)
 *    - Finds a listing by its ID and populates 'reviews' and 'owner'.
 *    - If listing not found, flashes error message and redirects.
 *    - Otherwise, renders 'edit.ejs' with existing data prefilled.
 *
 * 5. update(req, res)
 *    - Updates an existing listing using form data.
 *    - If a new image is uploaded, replaces the previous one.
 *    - Saves updated listing and flashes a success message.
 *    - Redirects the user to the listing’s detail page.
 *
 * 6. show(req, res)
 *    - Displays details of a specific listing.
 *    - Populates associated 'reviews' and their 'authors'.
 *    - Renders 'show.ejs' with listing data and review details.
 *    - If listing is missing, shows error flash and redirects.
 *
 * 7. delete(req, res)
 *    - Deletes a listing by its ID.
 *    - If listing not found, flashes error message.
 *    - Otherwise, flashes success and redirects to /listings.
 *
 * ======================================================================
 *
 * 🔄 Workflow Summary:
 *   - Receives route requests from routes/listings.js.
 *   - Performs CRUD operations using the Mongoose Listing model.
 *   - Interacts with EJS templates under /views/listings/ for rendering.
 *   - Uses connect-flash for displaying success/error feedback to users.
 *   - Uses Multer for file uploads (image handling).
 *   - Expects wrapAsync() middleware in routes to manage async errors.
 *
 * ======================================================================
 *
 * 🧠 Notes:
 *   - Always check if (req.file) exists before accessing file properties.
 *   - If listing not found, flash an error and redirect gracefully.
 *   - Avoid leaving console.log() in production.
 *   - Keep routes protected (ensure authentication middleware is used).
 *
 * ======================================================================
 */
