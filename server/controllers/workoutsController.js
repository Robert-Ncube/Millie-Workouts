import Workout from "../models/workoutModel.js";
import mongoose from "mongoose";

//GET All workouts
export const getAllWorkouts = async (req, res, next) => {
  try {
    const workouts = await Workout.find().sort({
      createdAt: -1, // Sort by createdAt in descending order
    });
    res.status(200).json(workouts);
  } catch (error) {
    next(error);
  }
};

//GET Single Workout
export const getSingleWorkout = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Workout not found!" });
    }

    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ error: "Workout not found!" });
    res.status(200).json(workout);
  } catch (error) {
    next(error);
  }
};

//Create a new workout
export const createWorkout = async (req, res, next) => {
  const { title, load, reps } = req.body;

  const emptyFields = [];
  if (!title) emptyFields.push("title");
  if (!load) emptyFields.push("load");
  if (!reps) emptyFields.push("reps");

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: `Please provide all required fields: ${emptyFields.join(", ")}!`,
      emptyFields,
    });
  }

  // Validate doc input data and add it to DataBase
  try {
    const workout = await Workout.create({
      title,
      load,
      reps,
    });
    res.status(201).json(workout);
  } catch (error) {
    next(error);
  }
};

//Update a workout
export const updateWorkout = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Workout not found!" });
    }

    const updatedWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedWorkout)
      return res.status(404).json({ error: "Workout not found!" });

    res.status(200).json(updatedWorkout);
  } catch (error) {
    next(error);
  }
};

//Delete a workout
export const deleteWorkout = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Workout not found!" });
    }

    const deletedWorkout = await Workout.findByIdAndDelete(req.params.id);

    if (!deletedWorkout) {
      return res.status(404).json({ error: "Workout not found!" });
    }

    res.status(200).json({ message: "Workout deleted successfully!" });
  } catch (error) {
    next(error);
  }
};
