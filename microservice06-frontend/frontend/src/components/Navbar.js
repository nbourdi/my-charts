import { Link } from "react-router-dom";
import React, { useContext } from "react";
import UserContext from "../UserContext";

const Navbar = () => {

  const { user, updateUser } = useContext(UserContext);
  
  const logout = async () => {     // TODO: make this fetch/axios
    updateUser(null); //destroy user session information
    window.open("http://localhost:3000/logout", "_self");
    setTimeout(() => {
      window.location.href = "http://localhost:3030/"; // Redirect to the home page
    }, 800);
    

    // axios.get("http://localhost:3000/logout")
    // .finally(window.location.href = "http://localhost:3030/")

    // axios.get(`http://localhost:3000/logout`)
    // .finally(() => {
    //    window.location.replace("http://localhost:3030/");
    // })
    // .catch(error => {
    //   console.error("Logout request failed:", error);
    // });
    // try {
    //   const re = await axios.get(`http://localhost:3000/logout`);
    //   window.location.href = '/'
    //   console.log(re)
    // } catch (e) {
    //   console.log(e)
    // }
  };

  return (
    <div className="navbar">
      <span className="logo">
        <Link className="link" to="/">
          MyCharts
        </Link>
        <Link className="about" to="/about">
          About
        </Link>
        <Link className="about" to="/purchase">
          Buy Credits
        </Link>
      </span>
      
      {user ? (
        <ul className="list">
          <li className="listItem">
            <img
              src={user.googleaccount.photos[0].value}
              alt=""
              className="avatar"
            />
          </li>
          <Link className="about" to="/user/charts"><b>{user.googleaccount.displayName}</b></Link>
          <Link className="link" onClick={logout}>
            Logout
          </Link>
        </ul>
      ) : (
        <Link className="link" to="login">
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;