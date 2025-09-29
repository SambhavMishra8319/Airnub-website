// import mongoose

const mongoose=require("mongoose");
const Schema=mongoose.Schema;

//creating schema
const listingSchema =new Schema({
title:{
    type:String,
    required:true,
},
description:{
    type:String,
    
},
image: {
  filename: {
    type: String,
    default: "listingimage",
  },
  url: {
    type: String,
    default: "D:/Coding/Web Develpoment/airbnb/Airnub-website/pexels-pixabay-158063.jpg",
    set: (v) =>
      v === "" ? "D:/Coding/Web Develpoment/airbnb/Airnub-website/pexels-pixabay-158063.jpg" : v,
  },
},

location:{
    type:String,
},
price:{
    type:Number,
},
country:{
    type:String,
}

});
// create model
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;