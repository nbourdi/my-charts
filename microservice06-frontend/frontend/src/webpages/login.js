import Google from "../img/google.png";

const Login = () => {
  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <div className="login">
      <h1 className="loginTitle">Choose a Login Method</h1>
      <div className="wrapper">
        <h3> Sign in to start creating your charts! </h3>
        <div className="left">
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