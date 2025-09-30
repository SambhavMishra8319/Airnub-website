const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongo_url = "mongodb://127.0.0.1/wanderlust";
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
const path = require("path");
const ejsmate = require("ejs-mate");
const { prototype } = require("events");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");
main()
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(mongo_url);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsmate);

app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.send("hi i am root ");
});

// app.get("/testlisting",async(req,res)=>{
//   let samplelisting=new  Listing({
//     title:"my New Villa ",
//     description:"by the beach of Goa",
//     price:1200,
//     location:"goa",
//     country:"India",
//   });
//   await samplelisting.save();
//   console.log("sample is saved ");
//   res.send("successfull listing ");
// });

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  // console.log(result);
  if (error) {
    let errMsg=error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

app.get("/listings", async (req, res) => {
  const alllistings = await Listing.find({});
  res.render("listings/index.ejs", { alllistings });
});

//new route
app.get("/listings/new", (req, res) => {
  res.render("listings/new");
});

//create route
app.post(
  "/listings",
  validateListing,
  wrapAsync(async (req, res, next) => {
    // if (!req.body.listing) {
    //   throw new ExpressError(400, "send valid data for listing ");
    // }

    const newlisting = new Listing(req.body.listing);
    await newlisting.save();
    res.redirect("/listings");
  })
);

//edit route
app.get(
  "/listings/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  })
);

// update route
app.put(
  "/listings/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  })
);

// show route
app.get(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
  })
);

//delete
app.delete(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedlisting = await Listing.findByIdAndDelete(id);
    console.log(deletedlisting);
    res.redirect("/listings");
  })
);

// app.all("/:path(*)",(req,res,next)=>{
//   next(new ExpressError(404,"page Not Found"));
// });
// catch-all route for anything not handled above
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// middleware error
// app.use((err, req, res, next) => {
//   let { statusCode, message } = err;
//   // res.send("something went wrong");
//   res.status((statusCode = 500)).send((message = "something went wrong"));
//   res.status(statusCode).render("error.ejs",{err});
// });
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500; // default 500
  const message = err.message || "Something went wrong!";
  res.status(statusCode).render("error.ejs", { err });
});

// prot
app.listen(8080, () => {
  console.log("server is listening at 8080 port ");
});
