import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { userRoute } from "./APIs/UserApi.js";
import { authorRoute } from "./APIs/AuthorApi.js";
import { adminRoute } from "./APIs/AdminApi.js";
import { commonRouter } from "./APIs/CommonApi.js";

dotenv.config();

const app = express();

// body parser middleware
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/common-api", commonRouter);
app.use("/user-api", userRoute);
app.use("/author-api", authorRoute);
app.use("/admin-api", adminRoute);



// database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database connected");

    app.listen(process.env.PORT, () =>
      console.log(`Server started on port ${process.env.PORT}`)
    );
  } catch (err) {
    console.error("Error in DB connection:", err);
    process.exit(1);
  }
};

connectDB();

// 404 handler (invalid path)
app.use((req, res) => {
  res.status(404).json({
    message: req.url + " is invalid path",
  });
});

// error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);

  res.status(500).json({message: err.message });
});