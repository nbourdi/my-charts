import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import './App.css';
import CreateBar from './webpages/create/bar_chart.js';
import SignInPage from './webpages/login.js'
import Header from './components/Header.js';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';

function App() {
  /* global google */
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT Id token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signinDiv").hidden = true;
  }

  function handleSignOut (event) {
    setUser({});
    document.getElementById("signinDiv").hidden = false;
  }


  useEffect(() => {
    
    google.accounts.id.initialize({
      client_id: "675325278468-j7d1l8op9koiha7qcg9e23q8a02olt7r.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signinDiv"),
      { theme: "outline", size: "large " }
    );
  }, []);



  return (
    <div className="App">
      
      { Object.keys(user).length !== 0 &&
        <button onClick={ (e) => handleSignOut(e)}> Sign Out </button>
      }
      

      {/* if the user is not signed in , every route prompts to login.. */}
      { Object.keys(user).length == 0 && 
        <Router>
          <SignInPage />
        </Router>
      }
      { Object.keys(user).length !== 0 && 
        <Router>
          <Header user={user} />
        <Routes>
            <Route path='/' element={<CreateBar />}>
            <Route exact path='/create' element={<CreateBar />} />
        </Route>
        </Routes>
        </Router>
      }

    </div>
  );
}

export default App;