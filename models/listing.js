// import mongoose

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { ref } = require("joi");
// const { ref } = require("joi");
//creating schema
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      default:
        "https://pixabay.com/photos/landscape-rainbow-tropical-atoll-7373484/",
      set: (v) =>
        v === ""
          ? "https://pixabay.com/photos/landscape-rainbow-tropical-atoll-7373484/"
          : v,
    },
  },

  location: {
    type: String,
  },
  price: {
    type: Number,
  },
  country: {
    type: String,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
  }
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});
// create model
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
