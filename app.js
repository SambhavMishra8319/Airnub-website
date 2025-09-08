// Import Required Modules
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");

// MongoDB Connection URL
const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";

// Connect to MongoDB
main()
  .then(() => {
    console.log("✅ Connected to DB");
  })
  .catch((err) => {
    console.log("❌ DB Connection Error:", err);
  });

async function main() {
  await mongoose.connect(mongo_url);
}

// Routes
app.get("/", (req, res) => {
  res.send("Hi, I am root 🚀");
});

app.get("/listings",(req,res)=>{
  Listing.find({}).then(res=>{
    console.log("res");
  })
})


// Test Route: Create a sample listing
// app.get("/testlisting", async (req, res) => {
//   try {
//     const sampleListing = new Listing({
//       title: "Cozy Beach House",
//       description: "A beautiful beach house with ocean views 🌊",
//     //   image: "", // will trigger default image
//       price: 150,
//       location: "Goa",
//       country: "India",
//     });

//     await sampleListing.save();
//     res.send(sampleListing);
//   } catch (err) {
//     res.status(500).send("Error creating test listing ❌ " + err);
//   }
// });

// Start Server
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
