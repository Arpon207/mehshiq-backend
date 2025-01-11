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
    variants: {
      type: Array,
      required: true,
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
    video: {
      type: String,
    },
    discount: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
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
