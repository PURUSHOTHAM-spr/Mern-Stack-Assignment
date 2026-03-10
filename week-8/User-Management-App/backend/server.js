import exp from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import { UserApp } from "./APIs/UserAPI.js";
import cors from 'cors'
//Read environment variables
config();


// Create HTTP Server
const app = exp();
//add cors
app.use(cors({
  origin:['http://localhost:5173']
}))
// Add body parser middleware
app.use(exp.json());
// Forward req to UserAPI if path starts with /user-api
app.use("/user-api", UserApp);

// Connect to DB
async function connectDB() {
  try {
    await connect(process.env.DB_URL);
    console.log("Connected to DB");
    //assign port number
    const port = process.env.PORT;
    app.listen(port, () => console.log(`Server on port ${port}`));
  } catch (err) {
    console.log("err in DB connection :", err);
  }
}

connectDB();

// Add error handling middleware
app.use((err, req, res, next) => {

  console.log("err is ",err)
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

