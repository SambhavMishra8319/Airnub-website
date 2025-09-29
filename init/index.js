const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");
const mongo_url="mongodb://127.0.0.1/wanderlust";

main()
    .then(()=>{
          console.log("connection established");
    })
    .catch((err)=>{
          console.log(err);
    });
async function main(){
    await mongoose.connect(mongo_url);
};
const initDB=async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log("data was initialised");
;}

initDB();