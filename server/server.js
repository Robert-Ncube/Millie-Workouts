import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import workoutRoutes from "./routes/workoutsRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Enable CORS for cross-origin requests
app.use(cors());

app.use((req, res, next) => {
  console.log(`New request: ${req.method} ${req.url}`);
  next();
});

// Error handling middleware
app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});

// API endpoints
app.use("/api/workouts", workoutRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB!");
    //listen for requests
    const PORT = process.env.PORT || 2000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}!!!`);
    });
  })
  .catch((error) => {
    console.error(error.message);
  });
