import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    colors: [String],
    availableQuantity: {
      type: Number,
      default: 0,
    },
    totalSold: {
      type: Number,
      default: 0,
    },
    slug: {
      type: String,
      required: true,
    },
    tags: [String],
    images: [Object],
    video: {
      type: String,
    },
    discount: {
      type: Number,
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "reviews",
      },
    ],
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default mongoose.model("products", productSchema);
