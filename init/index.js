const mongoose = require("mongoose");
const { data } = require("./data.js");   // ✅ destructure correctly
const Listing = require("../models/listing.js");

// MongoDB Connection URL
const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";

// Connect to MongoDB
main()
  .then(() => console.log("✅ Connected to DB"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

async function main() {
  await mongoose.connect(mongo_url);
}

// Initialize DB
const initDB = async () => {
  await Listing.deleteMany({});
//   await Listing.insertMany(data);   // ✅ use "data" directly
//   console.log("🌱 Sample listings inserted");
const inserted = await Listing.insertMany(data);
console.log(`🌱 Inserted ${inserted.length} listings`);

};

initDB();
