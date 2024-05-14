import { AuthClient } from "Context/AuthContext";

const inMemoryJwtService = () => {
  let inMemoryJwt = null;
  let refreshTimeoutId = null;

  const getToken = () => {
    return inMemoryJwt;
  };

  const refreshAccessToken = (expireTime) => {
    let timeoutTrigger = expireTime - 10000;

    refreshTimeoutId = setTimeout(() => {
      AuthClient.post("/refresh")
        .then((response) => {
          const { accessToken, expireTime } = response.data;
          setToken(accessToken, expireTime);
        })
        .catch((error) => {
          console.log(error);
        });
    }, timeoutTrigger);
  };

  const abortRefreshToken = () => {
    if (refreshTimeoutId) {
      clearTimeout(refreshTimeoutId);
    }
  };

  const setToken = (accessToken, expirationTime) => {
    inMemoryJwt = accessToken;
  };

  const deleteToken = () => {
    inMemoryJwt = null;
    abortRefreshToken();
  };

  return { getToken, setToken, deleteToken };
};

export default inMemoryJwtService();
