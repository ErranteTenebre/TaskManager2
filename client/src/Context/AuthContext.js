import axios from "axios";
import config from "appConfig";
import showErrorMessage from "Utils/showErrorMessage";
import { createContext, useEffect, useState } from "react";
import { Circle } from "react-preloaders";
import inMemoryJwtService from "Services/inMemoryJwtService";
import { Preloader } from "Components/Preloader";
import { handleGetWorkspace } from "Context/DataContext";

export const AuthClient = axios.create({
  baseURL: `${config.SERVER_BASE_URL}`,
  withCredentials: true,
});

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [user, setUser] = useState();
  const [data, setData] = useState();

  const handleSignUp = (data) => {
    AuthClient.post("/register", data)
      .then((response) => {
        const { accessToken, expireTime, user } = response.data;
        inMemoryJwtService.setToken(accessToken, expireTime);

        setIsUserLogged(true);
        setUser(user);
      })
      .catch((error) => {
        showErrorMessage(error);
      });
  };

  const handleFetchProtected = () => {};

  const handleLogOut = () => {
    AuthClient.post("/logout")
      .then((response) => {
        inMemoryJwtService.deleteToken();
        setIsUserLogged(false);
        setUser();
      })
      .catch((error) => {
        showErrorMessage(error);
      });
  };

  const handleSignIn = async (data, navigateTo) => {
    try {
      const response = await AuthClient.post("/login", data);
      const { accessToken, expireTime, user } = response.data;
      inMemoryJwtService.setToken(accessToken, expireTime, user);

      const workspaceResponse = await axios.get(
        `https://localhost:7002/api/workspace?userId=${user.id}`
      );
      const selectedWorkspaceId = await workspaceResponse.data[0].id;

      setIsUserLogged(true);
      setUser(user);

      if (selectedWorkspaceId) {
        navigateTo(`/workspace/${selectedWorkspaceId}/dashboard`);
      } else {
        navigateTo(`/workspace/0/dashboard`);
      }
    } catch (error) {
      showErrorMessage(error);
      setIsUserLogged(false);
    }
  };

  const getUserData = () => {
    AuthClient.get("/user")
      .then((response) => {
        return response.data;
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    console.log("refresh");
    AuthClient.post("/refresh")
      .then((response) => {
        const { accessToken, expireTime, user } = response.data;
        inMemoryJwtService.setToken(accessToken, expireTime);

        setIsAppReady(true);
        setIsUserLogged(true);
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
        setIsAppReady(true);
        setIsUserLogged(false);
        setUser();
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        data,
        handleFetchProtected,
        handleSignUp,
        handleSignIn,
        handleLogOut,
        getUserData,
        isUserLogged,
        isAppReady,
        user,
      }}
    >
      {isAppReady ? children : <Preloader />}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
