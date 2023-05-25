import Google from "../img/google.png";
import React, { useContext } from "react";

const Login = () => {
  const google = () => {
    window.open("http://localhost:3000/auth/google", "_self");
  };

  return (
    <div className="login">
      <div className="wrapper">
        <div className="left">
          <h3>
            <p> Sign in to start creating your charts! </p>
            </h3>
          
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google Sign In
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;