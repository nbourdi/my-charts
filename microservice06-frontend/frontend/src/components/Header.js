import React from 'react'
import './Header.css';


function Header({ user }) {
  return (
    <header className="sticky-header">
      <div className="app-name">MyCharts</div>
      {user && (
        <div className="user-info">
          <img src={user.picture} alt="User Avatar" className="avatar" />
          <div className="user-name">{user.name}</div>
          <div id="signinDiv"> </div>
        </div>
      )}
    </header>
  );
}

export default Header;