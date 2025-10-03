const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const listings=require("./routes/listing.js");
const reviews = require("./routes/review.js");
const Listing = require("./models/listing.js");

const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";

// Connect to MongoDB
main()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongo_url);
}

// App configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsmate);
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(methodOverride("_method")); // Support PUT & DELETE methods
app.use(express.static(path.join(__dirname, "/public"))); // Serve static files




app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);



// Home route - display all listings
app.get("/", async (req, res) => {
  const alllistings = await Listing.find({});
  res.render("listings/index.ejs", { alllistings });
});








// ===========================
// Error Handling
// ===========================

// Handle 404
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// Global Error Handler
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh no! Something went wrong.";
  res.status(statusCode).render("error.ejs", { err });
});


app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
