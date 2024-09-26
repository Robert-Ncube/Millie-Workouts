import React, { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutsForm from "../components/WorkoutsForm";
import { useWorkoutsContext } from "../hooks/UseWorkoutsContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    // Fetch data from API
    const fetchWorkoutsData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/workouts");
        const data = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_WORKOUTS", payload: data });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchWorkoutsData();
  }, [dispatch]);

  return (
    <main className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => <WorkoutDetails workout={workout} />)}
      </div>
      <WorkoutsForm />
    </main>
  );
};

export default Home;
