import React, { useContext, useState, useRef } from "react";
import { UserContext } from "../hooks/userContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");
  const { signupUser, signupError } = useContext(UserContext);

  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const passwordValidationRef = useRef();

  const resetForm = () => {
    emailRef.current.value = "";
    usernameRef.current.value = "";
    passwordRef.current.value = "";
    passwordValidationRef.current.value = "";
    emailRef.current.focus();
  };

  return (
    <div className="col">
      <h2 className="text-success text-center">Signup to my demo app</h2>
      <input
        ref={emailRef}
        className="col form-control mb-1"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        ref={usernameRef}
        className="col form-control mb-1"
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        ref={passwordRef}
        className="col form-control mb-1"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        ref={passwordValidationRef}
        className="col form-control mb-1"
        type="password"
        placeholder="Password Validation"
        onChange={(e) => setPasswordValidation(e.target.value)}
      />
      <button
        className="col btn btn-success mb-1"
        onClick={() => {
          resetForm();
          signupUser(email, username, password, passwordValidation);
        }}
      >
        Signup
      </button>
      <p className="text-center text-danger">{signupError}</p>
    </div>
  );
};

export default Signup;
