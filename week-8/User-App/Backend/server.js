import exp from "express";
import { connect } from "mongoose";
import { userApp } from "./API/userApi.js";
import dotenv from "dotenv"
dotenv.config()
// create HTTP server
const app = exp();
//body parse middleware
app.use(exp.json());

//route
app.use('/user-api', userApp);

// connect to db
const connection = async () => {
    try {
let database= await connect("mongodb://127.0.0.1:27017/UserDataDB");

        console.log("connection success");
        
        app.listen(process.env.PORT, () => console.log(`Sever is listening on port ${process.env.PORT}`));
    } catch (err) {
        console.log("Err in connection", err);
    }
}
connection()

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

app.use((err, req, res, next) => {
  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.errors,
    });
  }
  // Invalid ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }
  // Duplicate key
  if (err.code === 11000) {
    return res.status(409).json({
      message: "Duplicate field value",
    });
  }
  res.status(500).json({
    message: "Internal Server Error",
  });
});


