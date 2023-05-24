import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserInfo() {
  const [user, setUser] = useState();
  useEffect(() => {
    const getUser = () => {
      if (user) {
        return; // Skip the fetch if the user is already set or signed out
      }
      console.log("fetch");
      fetch("http://localhost:3000/userinfo", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((resObject) => {
          console.log(resObject.user);
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, [user]);

  const credits = () => {
     window.location.href = "http://localhost:3030/purchase"
  };
  const newchart = () => {
    window.location.href = "http://localhost:3030/"
  };
  const yourcharts = () => {
    window.location.href = "http://localhost:3030/user/charts"
  };

  return (
    <div className='layout'>
      {user ? (
        <div><b>Welcome back</b>, {user.name}! <br></br> Here's your account info.
          <div className='center'>
            <table className='usertable'>

              <tr>
                <td><b>Number of charts</b></td>
                <td>0</td>
              </tr>
              <tr>
                <td><b>Available credits</b></td>
                <td>{user.credits}</td>
              </tr>
              <tr>
                <td><b>Last Login</b></td>
                <td>{user.lastlogin ? (user.lastlogin) : "First Time!"}</td>
              </tr>
            </table>
          </div>
          <div className='center'>
            <button className='button' onClick={yourcharts}>Your Charts</button>
            <button className='button' onClick={newchart}>New Chart</button>
            <button className='button' onClick={credits}>Buy Credits</button> </div>
        </div>


      ) : (
        <div> We apologize... Something went wrong fetching your information.</div>
      )}
    </div>
  );
}


export default UserInfo;