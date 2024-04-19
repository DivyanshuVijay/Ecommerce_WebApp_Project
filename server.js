// const express = require("express"); ---> in commonjs type
//in module type , write like this
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";

//configure dotenv file
dotenv.config();

//database configuration
connectDB();

//creating object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/products", productRoutes);

//creating rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce project!!</h1>");
});

const PORT = process.env.PORT || 8080; //agar env file me kuch issue aa jaaye toh port ko 8080 put kr dena by default

//listening on
app.listen(PORT, () => {
  console.log(`Server running on : ${PORT}`);
});
