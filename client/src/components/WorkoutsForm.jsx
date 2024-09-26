import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/UseWorkoutsContext";

export const WorkoutsForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send data to the server
    const workout = {
      title,
      reps,
      load,
    };

    // Example API call
    try {
      const response = await fetch("http://localhost:4000/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workout),
      });

      const createdWorkout = await response.json();

      if (!response.ok) {
        setError(createdWorkout.error);
        setEmptyFields(createdWorkout.emptyFields || []);
        return;
      }

      console.log("Workout created:", createdWorkout);
      dispatch({ type: "CREATE_WORKOUT", payload: createdWorkout });

      // Clear form fields
      setTitle("");
      setReps("");
      setLoad("");
      setError("");
      setEmptyFields([]);
    } catch (error) {
      console.error("Error creating workout:", error);
      setError("An error occurred while creating the workout.");
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add New Workout</h3>

      <label htmlFor="title">Exercise Title:</label>
      <input
        id="title"
        type="text"
        placeholder="Workout Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label htmlFor="reps">Reps:</label>
      <input
        id="reps"
        type="number"
        placeholder="Reps"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        className={emptyFields.includes("reps") ? "error" : ""}
      />

      <label htmlFor="load">Load (kg):</label>
      <input
        id="load"
        type="number"
        placeholder="Load (kg)"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
        className={emptyFields.includes("load") ? "error" : ""}
      />

      <button type="submit">Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutsForm;
