import axios from "axios";
import config from "appConfig";
import showErrorMessage from "Utils/showErrorMessage";
import { createContext, useEffect, useState } from "react";
import { Circle } from "react-preloaders";
import inMemoryJwtService from "Services/inMemoryJwtService";
import { Preloader } from "Components/Preloader";

export const AuthClient = axios.create({
  baseURL: `${config.SERVER_BASE_URL}`,
  withCredentials: true,
});

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [data, setData] = useState();

  const handleSignUp = (data) => {
    AuthClient.post("/register", data)
      .then((response) => {
        const { accessToken, expireTime } = response.data;
        inMemoryJwtService.setToken(accessToken, expireTime);

        setIsUserLogged(true);
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
      })
      .catch((error) => {
        showErrorMessage(error);
      });
  };

  const handleSignIn = (data, navigateTo) => {
    AuthClient.post("/login", data)
      .then((response) => {
        const { accessToken, expireTime } = response.data;
        inMemoryJwtService.setToken(accessToken, expireTime);

        setIsUserLogged(true);

        const selectedWorkspaceId = localStorage.getItem("selectedWorkspaceId");

        if (selectedWorkspaceId) {
          navigateTo(`/workspace/${selectedWorkspaceId}/dashboard`);
        } else {
          navigateTo(`/workspace/0/dashboard`);
        }
      })
      .catch((error) => {
        showErrorMessage(error);
        setIsUserLogged(false);
      });
  };

  const getUserData = () => {
    AuthClient.get("/user")
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    console.log("refresh");
    AuthClient.post("/refresh")
      .then((response) => {
        const { accessToken, expireTime } = response.data;
        inMemoryJwtService.setToken(accessToken, expireTime);

        setIsAppReady(true);
        setIsUserLogged(true);
      })
      .catch((error) => {
        console.log(error);
        setIsAppReady(true);
        setIsUserLogged(false);
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
      }}
    >
      {isAppReady ? (
        children
      ) : (
        <div className="centered">
          <div>Загрузка</div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
