
// Import Mongoose

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Define Listing Schema

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
//   image: {
//     type: String,
//     default:
//         "file:///C:/Users/SAI/Downloads/pexels-pixabay-158063.jpg",
//     // Set default image if empty string is given
//     set: (v) =>
//       v === ""
//         ? "https://images.pexels.com/photos/1024975/pexels-photo-1024975.jpeg"
//         : v,
//   },
image: {
    filename: { type: String, default: "listingimage" },
    url: {
      type: String,
      default:
        "https://images.pexels.com/photos/1024975/pexels-photo-1024975.jpeg",
    },
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
});


// Create Model

const Listing = mongoose.model("Listing", listingSchema);


// Export Model

module.exports = Listing;
