import { TasksContext } from "Context/TasksContext";
import { useContext } from "react";

export const useTasks = () => {
  return useContext(TasksContext);
};
