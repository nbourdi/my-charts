import Navbar from "./components/Navbar";
import "./App.css";
import CreateBar from "./webpages/create/bar_chart"
import Home from "./webpages/Home";
import Login from "./webpages/login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = () => {
      if (user) {
        return; // Skip the fetch if the user is already set or signed out
      }
      console.log("fetch");
      fetch("http://localhost:3000/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("Authentication has failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getUser();
  }, [user]); 
  

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