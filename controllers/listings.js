// const Listing=require("../models/listing.js");



// module.exports.index=async (req, res) => {
//     const alllistings = await Listing.find({});
//     res.render("listings/index.ejs", { alllistings });
//   };

// module.exports.new=(req, res) => {
//   console.log(req.user);
//   res.render("listings/new.ejs");
// };

// module.exports.create=async (req, res) => {
//     const newlisting = new Listing(req.body.listing);
//     newlisting.owner = req.user._id;
//     await newlisting.save();
//     req.flash("success", "Successfully made a new listing!");
//     res.redirect("/listings");
//   };

// module.exports.edit=async (req, res) => {
//     const { id } = req.params;
//     const listing = await Listing.findById(id).populate("reviews").populate("owner");
//     if (!listing) {
//       req.flash("error", "Listing you requested does not exist!");
//       return res.redirect("/listings");
//     }
//     res.render("listings/edit.ejs", { listing });
//   };

// module.exports.update=async (req, res) => {
//     const { id } = req.params;
//     const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

//     if (!listing) {
//       req.flash("error", "Listing you requested does not exist!");
//       return res.redirect("/listings");
//     }

//     req.flash("success", "Successfully updated the listing!");
//     res.redirect(`/listings/${id}`);
//   };

// module.exports.show=async (req, res) => {
//     const { id } = req.params;
//     const listing = await Listing.findById(id)
//       .populate({ path: "reviews", populate: { path: "author" } })
//       .populate("owner");

//     if (!listing) {
//       req.flash("error", "Listing not found!");
//       return res.redirect("/listings");
//     }

//     res.render("listings/show.ejs", { listing });
//   };

//   module.exports.delete=async (req, res) => {
//     const { id } = req.params;
//     const deletedlisting = await Listing.findByIdAndDelete(id);
//     if (!deletedlisting) throw new ExpressError(404, "Listing not found");
//     req.flash("success", "Successfully deleted the listing!");
//     res.redirect("/listings");
//   };
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
