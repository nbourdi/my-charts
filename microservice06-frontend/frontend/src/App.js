import Navbar from "./components/Navbar";
import "./App.css";
import CreateBar from "./webpages/create/bar_chart"
import Home from "./webpages/Home";
import Login from "./webpages/login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {

      axios.get('http://localhost:3000/getUser')
        .then(response => {
          // setUser(response.data);
          console.log(response.data.data);
        })
        .catch( err => 
          console.log(err)); 

  }, []);
  

  return (
    <BrowserRouter>
      <div>
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/create"
            // NEED TO UNCOMMENT , DID CAUSE WAS REDIRECTING..
            // element={user ? <CreateBar /> : <Navigate to="/login" />}
            element={<CreateBar />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;