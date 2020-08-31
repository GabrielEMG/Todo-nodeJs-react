import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../hooks/userContext";

const Header = () => {
  const { userData, logoutUser } = useContext(UserContext);
  return (
    <nav className="">
      {userData.user ? (
        <div className="row justify-content-between">
          <Link to="/">Home</Link>
          <h3 className="text-success">welcome {userData.user.username}</h3>
          <p className="text-primary" onClick={() => logoutUser()}>
            logout
          </p>
        </div>
      ) : (
        <div className="row justify-content-between">
          <Link className="" to="/login">
            Login
          </Link>
          <Link className="" to="/signup">
            Signup
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
