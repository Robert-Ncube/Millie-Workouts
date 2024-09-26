import React from "react";
import { useWorkoutsContext } from "../hooks/UseWorkoutsContext";
import DeleteIcon from "@mui/icons-material/Delete";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = (props) => {
  const { workout } = props;
  const { dispatch } = useWorkoutsContext();

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/workouts/${workout._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete workout");
      }

      dispatch({
        type: "DELETE_WORKOUT",
        payload: { _id: workout._id },
      });
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  return (
    <div className="workout-details">
      <div key={workout._id} className="workout">
        <h4>{workout.title}</h4>
        <p>Load: {workout.load} kg</p>
        <p>Reps: {workout.reps}</p>
        <p>
          Created:{" "}
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </p>
        <span onClick={handleDelete}>
          <DeleteIcon />
        </span>
      </div>
    </div>
  );
};

export default WorkoutDetails;
