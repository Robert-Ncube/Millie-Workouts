import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        ...state,
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        ...state,
        workouts: [action.payload, ...state.workouts],
      };
    case "UPDATE_WORKOUT":
      const updatedWorkouts = state.workouts.map((workout) =>
        workout._id === action.payload._id ? action.payload : workout
      );
      return {
        workouts: updatedWorkouts,
        ...state,
      };
    case "DELETE_WORKOUT":
      return {
        ...state,
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
