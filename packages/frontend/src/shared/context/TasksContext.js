import React, { createContext } from "react";
import { useProvideTasks } from "../hooks/useTasksContext";

export const TasksContext = createContext();

export const TasksProvider = props => {
  const tasksContext = useProvideTasks([]);
  return (
    <TasksContext.Provider value={tasksContext}>
      {props.children}
    </TasksContext.Provider>
  );
};