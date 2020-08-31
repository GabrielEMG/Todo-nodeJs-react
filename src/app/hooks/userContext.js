import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";

const UserContext = createContext();
const { Provider } = UserContext;

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    user: null,
    token: null,
  });
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");
  const history = useHistory();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        let token = localStorage.getItem("auth-token");
        if (token === null) {
          localStorage.setItem("auth-token", "");
          token = "";
        }
        const tokenRes = await axios.post("/users/tokenIsValid", null, {
          headers: { "x-auth-token": token },
        });
        if (tokenRes.data) {
          const userRes = await axios.get("/users/", {
            headers: { "x-auth-token": token },
          });
          setUserData({
            token,
            user: userRes.data,
          });
        } else {
          history.push("/login");
        }
      } catch (err) {
        setError();
      }
    };
    checkLogin();
  }, []);

  const loginUser = async (email, password) => {
    try {
      const res = await axios.post("/users/login", { email, password });
      if (res.status === 200) {
        setUserData(res.data);
        localStorage.setItem("auth-token", res.data.token);
        history.push("/");
        setLoginError("");
        setSignupError("");
      }
    } catch (err) {
      setLoginError(err.response.data.message);
    }
  };

  const logoutUser = () => {
    setUserData({
      user: null,
      token: null,
    });
    localStorage.setItem("auth-token", "");
    history.push("/login");
  };

  const signupUser = async (email, username, password, passwordValidation) => {
    try {
      const res = await axios.post("/users/signup", {
        email,
        username,
        password,
        passwordValidation,
      });
      if (res.status === 201) {
        await loginUser(email, password);
        return res;
      }
    } catch (err) {
      setSignupError(err.response.data.message);
    }
  };

  return (
    <Provider
      value={{
        userData,
        loginUser,
        logoutUser,
        signupUser,
        loginError,
        signupError,
      }}
    >
      {children}
    </Provider>
  );
};

export { UserProvider, UserContext };
