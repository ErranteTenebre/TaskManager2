import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import config from "appConfig";

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const { workspaceId } = useParams();
  const [tasks, setTasks] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getTasks = () => {
    axios
      .get(`https://localhost:7002/api/tasks?workspaceId=${workspaceId}`)
      .then((response) => {
        setTasks(response.data);
        setIsLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTasks();
  }, [workspaceId]);

  return (
    <TasksContext.Provider value={{ tasks, isLoading, getTasks }}>
      {children}
    </TasksContext.Provider>
  );
};
