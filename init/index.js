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
