import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import config from "appConfig";

export const DataContext = createContext();

export const WorkspaceClient = axios.create({
  baseURL: `${config.SERVER_BASE_URL}`,
  withCredentials: true,
});

export const DataProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [workspaces, setWorkspaces] = useState();
  const [selectedWorkspace, setSelectedWorkspace] = useState();

  const handleGetWorkspace = () => {
    WorkspaceClient.get(`workspace?userId=${user.id}`) // Передаем userId в URL запроса
      .then((response) => {
        const workspacesData = response.data;
        setWorkspaces(workspacesData);
        setSelectedWorkspace(workspacesData[0]);
        localStorage.setItem(["selectedWorkspaceId", workspacesData[0].id]);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    if (!user) return;
    handleGetWorkspace(user.id);
  }, [user]);

  return (
    <DataContext.Provider
      value={{
        handleGetWorkspace,
        workspaces,
        setWorkspaces,
        selectedWorkspace,
        setSelectedWorkspace,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
