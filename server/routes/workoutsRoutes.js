import express from "express";
import {
  createWorkout,
  deleteWorkout,
  getAllWorkouts,
  getSingleWorkout,
  updateWorkout,
} from "../controllers/workoutsController.js";

const router = express.Router();

//GET All workouts
router.get("/", getAllWorkouts);

//GET Single Workout
router.get("/:id", getSingleWorkout);

//Create a new workout
router.post("/", createWorkout);

//Update a workout
router.patch("/:id", updateWorkout);

//Delete a workout
router.delete("/:id", deleteWorkout);

export default router;
