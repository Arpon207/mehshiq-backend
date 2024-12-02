import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRoute from "./routes/products.js";
import reviewRoute from "./routes/reviews.js";

const app = express();
const port = process.env.PORT || 5000;
dotenv.config();

//connection
const connection = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(port, () => {});
    console.log("connected to MongoDB.");
  } catch (error) {
    throw error;
  }
};
connection();

//middlewares
app.use(cors());
app.use(express.json());
app.use("/api/products/", productRoute);
app.use("/api/reviews/", reviewRoute);

app.get("/", async (req, res) => {
  res.send("MehShiq server.");
});
