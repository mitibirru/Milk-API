import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import ordersRoute from "./routes/orders.js";

const app = express();
dotenv.config();

// middlewares
app.use(express.json());
app.use("/api", ordersRoute);

// db connection
const dbConnectionUrl = process.env.MONGO;
const connect = async () => {
  try {
    await mongoose.connect(dbConnectionUrl);
    console.log("Connected to MongooseDB");
  } catch (error) {
    throw error;
  }
};

const port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, () => {
  connect();
  console.log(`Server started on port ${PORT}`);
});
