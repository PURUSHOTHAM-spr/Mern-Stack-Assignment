import exp from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import { UserApp } from "./APIs/UserAPI.js";
import cors from "cors";

config();

const app = exp();

// Standard CORS configuration (allow all origins)
app.use(
cors({
origin: "*", // allow requests from all frontends
methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
allowedHeaders: ["Content-Type", "Authorization"]
})
);

app.use(exp.json());

// Routes
app.use("/user-api", UserApp);

// Database Connection
async function connectDB() {
  try {
    await connect(process.env.DB_URL);
    console.log("Connected to DB");

    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server on port ${port}`));
  } catch (err) {
    console.log("Error in DB connection:", err);
  }
}

connectDB();

// Global Error Middleware
app.use((err, req, res, next) => {
  console.log("Error logic caught:", err.message);

  if (err.name === "ValidationError") {
    return res.status(400).json({ message: "Validation failed", errors: err.errors });
  }
  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  if (err.code === 11000) {
    return res.status(409).json({ message: "Duplicate field value" });
  }

  res.status(500).json({ message: "Internal Server Error", error: err.message });
});