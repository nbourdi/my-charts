import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  const logout = () => {    
    window.open("http://localhost:3000/logout", "_self");
    setTimeout(() => {
      window.location.href = "http://localhost:3030/"; // Redirect to the home page
    }, 1000);  };
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
          <li className="listItem">{user.displayName}</li>
          <li className="listItem" onClick={logout}>
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