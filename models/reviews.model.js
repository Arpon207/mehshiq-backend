import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      ref: "products",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      default: [],
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("reviews", reviewSchema);
