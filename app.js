if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}



const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");



const listingRouter=require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter=require("./routes/user.js");



const Listing = require("./models/listing.js");
const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";
// const dbUrl = process.env.ATLASDB_URL;
// console.log("Connecting to MongoDB at:", dbUrl);
console.log("Connecting to MongoDB at:", mongo_url);


// Connect to MongoDB
main()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongo_url);
}

const sessionOptions = {
  secret: "mysupersecret",
  resave: false,
  saveUninitialized: true,
  cookie:{
    expires:new Date(Date.now()+7*24*60*60*1000),
    maxAge:7*24*60*60*1000,
    httpOnly:true,
  },
};


// App configuration
app.engine("ejs", ejsmate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(methodOverride("_method")); // Support PUT & DELETE methods
app.use(express.static(path.join(__dirname, "/public"))); // Serve static files
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
   res.locals.error = req.flash("error");
   res.locals.currUser=req.user;
  next();
});


// app.get("/demouser",async(req,res)=>{
//   let fakeUser=new User(
//     {
//       email:"student@gmail.com",
//       username:"stu"

//   });
//   let registerUser=await User.register(fakeUser,"hellopassword");
//   res.send(registerUser);
// })

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);



// Home route - display all listings
// app.get("/", async (req, res) => {
//   const alllistings = await Listing.find({});
//   res.render("listings/index.ejs", { alllistings });
// });








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

// app.use((req, res, next) => {
//   res.locals.currUser = req.user;  // Passport sets req.user after login
//   next();
// });





/*
====================================
🌍 WANDERLUST - SERVER.JS SUMMARY
====================================

1️⃣ Environment Configuration
-----------------------------
- Loads environment variables from `.env` in development mode.
- Uses `dotenv` only if `NODE_ENV` is not "production".

2️⃣ Core Dependencies
---------------------
- express          → Web framework.
- mongoose         → MongoDB connection & models.
- path             → File path utilities.
- method-override  → Enables PUT/DELETE methods in forms.
- ejs-mate         → EJS layout engine for templates.
- connect-flash    → For flash messages (success/error).
- express-session  → For managing user sessions.
- passport         → For authentication.
- passport-local   → Local strategy (username/password login).

3️⃣ Models & Routers
---------------------
- Models:
    • Listing
    • User
- Routers:
    • listingRouter → Handles `/listings` routes.
    • reviewRouter  → Handles `/listings/:id/reviews` routes.
    • userRouter    → Handles `/signup`, `/login`, `/logout`.

4️⃣ Database Connection
------------------------
- MongoDB local URL: `"mongodb://127.0.0.1:27017/wanderlust"`
- Async connection using `mongoose.connect()`
- Logs status of the DB connection.

5️⃣ Session Configuration
-------------------------
- Secret: `"mysupersecret"`
- Cookie:
    • Expires after 7 days.
    • HTTP-only (prevents client-side access).

6️⃣ Middleware Setup
---------------------
- `app.engine("ejs", ejsmate)` → Enables EJS layouts.
- `express.urlencoded()` → Parses form data.
- `methodOverride("_method")` → Supports PUT & DELETE via query.
- `express.static("/public")` → Serves static files.
- Flash and session setup.
- Passport initialization and session support.

7️⃣ Passport Authentication
----------------------------
- Uses `passport-local` with `User.authenticate()`.
- `serializeUser` & `deserializeUser` handle session persistence.

8️⃣ Locals Middleware
----------------------
Sets variables available to all templates:
  • success (flash message)
  • error (flash message)
  • currUser (logged-in user)

9️⃣ Routes
-----------
- `/listings` → Listing routes.
- `/listings/:id/reviews` → Review routes.
- `/` → User authentication routes.

10️⃣ Error Handling
-------------------
- 404 Handler → Creates `ExpressError` for missing pages.
- Global Error Handler → Renders `error.ejs` with error message.

11️⃣ Server Initialization
--------------------------
- Listens on port `8080`.
- Logs `"Server is listening on port 8080"`.

====================================
✅ READY TO USE
This file fully configures your Express + MongoDB + Passport app.
====================================
*/
