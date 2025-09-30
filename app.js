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
//   let samplelisting=new Listing({
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
  wrapAsync(async (req, res, next) => {
    const newlisting = new Listing(req.body.Listing);
    await newlisting.save();
    res.redirect("/listings");
  })
);

//edit route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

// update route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.Listing });
  res.redirect(`/listings/${id}`);
});

// show route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

//delete
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deletedlisting = await Listing.findByIdAndDelete(id);
  console.log(deletedlisting);
  res.redirect("/listings");
});

// middleware error
app.use((err, req, res, next) => {
  res.send("something went wrong");
});

// prot
app.listen(8080, () => {
  console.log("server is listening at 8080 port ");
});
