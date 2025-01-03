import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRoute from "./routes/products.js";
import reviewRoute from "./routes/reviews.js";
import userRoute from "./routes/user.js";
import orderRoute from "./routes/order.js";
import categoryRoute from "./routes/categories.js";
import bodyparser from "body-parser";
import http from "http";
import { Server } from "socket.io";
import ordersModel from "./models/orders.model.js";

const app = express();
const port = process.env.PORT || 5000;
dotenv.config();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "https://admin-mehshiq.netlify.app/",
      "https://mehshiq.netlify.app/",
    ], // Replace with your admin panel URL
    methods: ["GET", "POST"],
  },
});

//connection
const connection = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URI);
    server.listen(port, () => {});
    console.log("connected to MongoDB.");
  } catch (error) {
    throw error;
  }
};
connection();

//middlewares
app.use(cors());

app.use(bodyparser.json({ limit: "50mb" }));

app.use(bodyparser.urlencoded({ extended: true, limit: "50mb" }));

app.use("/api/products/", productRoute);
app.use("/api/reviews/", reviewRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/categories", categoryRoute);

// io.on("connection", (socket) => {
//   console.log("Admin connected:", socket.id);

//   socket.on("disconnect", () => {
//     console.log("Admin disconnected:", socket.id);
//   });
// });

ordersModel.watch().on("change", (change) => {
  if (change.operationType === "insert") {
    const newOrder = change.fullDocument;
    io.emit("newOrder", newOrder);
  }
});

app.get("/", async (req, res) => {
  res.send("MehShiq server.");
});
