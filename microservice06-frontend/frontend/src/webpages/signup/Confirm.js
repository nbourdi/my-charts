import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ConfirmSignUp() {
  const create = () => {
    window.open("http://localhost:3000/create", "_self");
    setTimeout(() => {
      window.location.href = "http://localhost:3030/signup/success"; // Redirect to the home page
    }, 800);  };

    const cancel = () => {
      window.open("http://localhost:3000/cancel", "_self");
      setTimeout(() => {
        window.location.href = "http://localhost:3030/"; // Redirect to the home page
      }, 800);  };

    // const create = () => {
    //   axios.get("http://localhost:3000/create")
    //     .then(window.location.href = "http://localhost:3030/signup/success");
    //      // Redirect to the home page
    // }

  return (
    <div> <h3><p>Do you want to create an account?</p></h3> 
    <button onClick={create}> Create Account </button> 
    <button onClick={cancel}> Cancel </button> </div>
  );
}


export default ConfirmSignUp;