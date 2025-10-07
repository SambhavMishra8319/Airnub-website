const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const mongo_url = "mongodb://127.0.0.1/wanderlust";

main()
  .then(() => {
    console.log("✅ Connection established");
  })
  .catch((err) => {
    console.log("❌ Connection error:", err);
  });

async function main() {
  await mongoose.connect(mongo_url);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "68e131d77bc4cdb4de89ff63", 
  }));
  await Listing.insertMany(initData.data); 
  console.log("✅ Data was initialized");
};

initDB();



/******************************************************
 * File: init/index.js
 * Description:
 * This script initializes the MongoDB database for the Wanderlust app
 * with predefined listing data for development and testing.
 *
 * 🔹 Main Responsibilities:
 * 1. Connect to the MongoDB database using Mongoose.
 * 2. Delete all existing listings from the `listings` collection.
 * 3. Import initial listing data from `data.js`.
 * 4. Assign a default owner ID to each listing object.
 * 5. Insert all modified listings into the database.
 *
 * 🔄 Workflow:
 *  - Connects to MongoDB via `mongoose.connect()`.
 *  - Logs success or failure of the connection.
 *  - Calls `initDB()`:
 *      - Deletes existing listings using `Listing.deleteMany({})`.
 *      - Maps over `initData.data` to attach an owner ID.
 *      - Inserts the new data into MongoDB using `Listing.insertMany()`.
 *      - Logs a success message once initialization completes.
 *
 * ✅ Note:
 * - Ensure that the hardcoded owner ID exists in your users collection.
 * - Used only for local database setup or seeding test data.
 ******************************************************/
