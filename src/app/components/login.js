import React, { useContext, useState, useRef } from "react";
import { UserContext } from "../hooks/userContext";

const Login = () => {
  const { userData, loginError, loginUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();

  const resetForm = () => {
    emailRef.current.value = "";
    passwordRef.current.value = "";
    setEmail("");
    setPassword("");
  };
  const sendLogin = () => {
    resetForm();
    loginUser(email, password);
  };

  return (
    <div>
      {userData.user ? (
        <h1 className="text-danger">You are already loged in</h1>
      ) : (
        <div className="col-12">
          <h2 className="col text-center text-success">Login to my demo app</h2>
          <input
            ref={emailRef}
            className="form-control col"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            ref={passwordRef}
            className="form-control col mt-1 mb-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button className="btn btn-success col" onClick={() => sendLogin()}>
            Login
          </button>
          <p className="col bg-light text-danger text-center">{loginError}</p>
        </div>
      )}
    </div>
  );
};

export default Login;
