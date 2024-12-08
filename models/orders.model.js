import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    userDetails: {
      type: Object,
    },
    products: {
      type: Array,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: Number,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    ShippingDivision: {
      type: String,
      required: true,
    },
    shippingDistrict: {
      type: String,
      required: true,
    },
    shippingArea: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    shippingCharge: {
      type: Number,
      required: true,
    },
    additionalComment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("orders", orderSchema);
