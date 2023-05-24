import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = ({ user }) => {
  const logout = async () => {     // TODO: make this fetch/axios
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
      </span>
      {user ? (
        <ul className="list">
          <li className="listItem">
            <img
              src={user.photos[0].value}
              alt=""
              className="avatar"
            />
          </li>
          <li className="link" to="/user/charts">{user.displayName}</li>
          <li className="link" onClick={logout}>
            Logout
          </li>
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