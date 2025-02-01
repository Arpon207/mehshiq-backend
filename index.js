import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRoute from "./routes/products.js";
import reviewRoute from "./routes/reviews.js";
import userRoute from "./routes/user.js";
import orderRoute from "./routes/order.js";
import categoryRoute from "./routes/categories.js";
import authRoute from "./routes/auth.js";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";

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
app.use(
  cors({
    origin: [
      process.env.NODE_ENV === "production"
        ? "https://admin-mehshiq.netlify.app"
        : "http://localhost:5173",
      process.env.CLIENT_ENV === "production"
        ? "https://mehshiq.netlify.app"
        : "http://localhost:1992",
    ],
    credentials: true,
  })
);

app.use(bodyparser.json({ limit: "50mb" }));

app.use(bodyparser.urlencoded({ extended: true, limit: "50mb" }));

app.use(cookieParser());

app.use("/api/products/", productRoute);
app.use("/api/reviews/", reviewRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/auth", authRoute);

app.get("/", async (req, res) => {
  res.send("MehShiq server.");
});
