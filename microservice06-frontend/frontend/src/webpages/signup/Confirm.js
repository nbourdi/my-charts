import React from 'react';


function ConfirmSignUp() {
  const create = () => {
    window.open("http://localhost:3000/create", "_self");
    setTimeout(() => {
      window.location.href = "http://localhost:3030/user/info"; // Redirect to the home page
    }, 1500);  };

    const cancel = () => {
      window.open("http://localhost:3000/cancel", "_self");
      setTimeout(() => {
        window.location.href = "http://localhost:3030/user/info"; // Redirect to the welcome/userinfo 
      }, 800);  };

    // const create = () => {
    //   axios.get("http://localhost:3000/create")
    //     .then(window.location.href = "http://localhost:3030/signup/success");
    //      // Redirect to the home page
    // }

  return (
    <div className='layout'> 
      <div className='center'> <h2><p>It's the first time you're logging in... </p></h2> </div>
    <div  className="center">    <p>If you continue, your <b>email will be stored</b>  in our user database to <br></br> be able to store your created charts and purchase chart credits.</p>
    </div> 
    <div className='center'>
      <button onClick={create} className='button'> Continue </button> 
    <button onClick={cancel} className='button'> No, thanks </button> </div>
     </div>
  );
}


export default ConfirmSignUp;