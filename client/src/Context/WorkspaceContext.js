import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import config from "appConfig";
import { useLocation, useNavigate } from "react-router-dom";

export const WorkspaceContext = createContext();

export const WorkspaceClient = axios.create({
  baseURL: `${config.SERVER_BASE_URL}`,
  withCredentials: true,
});

export const WorkspaceProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useContext(AuthContext);

  const [workspaces, setWorkspaces] = useState();

  const [selectedWorkspace, setSelectedWorkspace] = useState();
  const [userRoleId, setUserRoleId] = useState();
  const [workspaceUsers, setWorkspaceUsers] = useState();

  const getWorkspaceList = () => {
    WorkspaceClient.get(`workspace?userId=${user.id}`)
      .then((response) => {
        const workspacesData = response.data;
        setWorkspaces(workspacesData);
        setSelectedWorkspace(workspacesData[0]);
        localStorage.setItem(["selectedWorkspaceId", workspacesData[0].id]);
      })
      .catch((error) => {});
  };

  const getWorkspaceUsers = () => {
    WorkspaceClient.get(`workspace/users?workspaceId=${selectedWorkspace.id}`)
      .then((response) => {
        let workspaceUsers = response.data;

        setWorkspaceUsers(workspaceUsers);
        console.log(workspaceUsers);
      })
      .catch((error) => console.error(error));
  };

  const getCurrentUserRole = () => {
    WorkspaceClient.get(
      `workspace/role?userId=${user.id}&workspaceId=${selectedWorkspace.id}`
    )
      .then((response) => {
        let userRoleId = response.data;

        setUserRoleId(userRoleId);
      })
      .catch((error) => console.error(error));
  };

  const selectWorkspace = (workspaceId) => {
    const selected = workspaces.find(
      (workspace) => workspace.id === workspaceId
    );
    if (selected) {
      setSelectedWorkspace(selected);
      localStorage.setItem("selectedWorkspaceId", workspaceId);
      let parts = location.pathname.split("/");
      parts[2] = workspaceId;
      navigate(parts.join("/"));
    }
  };

  useEffect(() => {
    if (!user) return;
    getWorkspaceList(user.id);
  }, [user]);

  useEffect(() => {
    if (!selectedWorkspace) return;

    getWorkspaceUsers();
    getCurrentUserRole();
  }, [selectedWorkspace]);

  return (
    <WorkspaceContext.Provider
      value={{
        getWorkspaceList,
        workspaces,
        setWorkspaces,
        selectedWorkspace,
        setSelectedWorkspace,
        selectWorkspace,
        workspaceUsers,
        userRoleId,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};
