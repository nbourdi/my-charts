import Navbar from "./components/Navbar";
import "./App.css";
import CreateBar from "./webpages/create/bar_chart"
import Home from "./webpages/Home";
import Login from "./webpages/login";
import BarPreview from "./webpages/preview/chart_1";
import ScatterPreview from "./webpages/preview/chart_3";
import SimplePreview from "./webpages/preview/chart_2";
import SuccessfulSignUp from "./webpages/signup/Success";
import ConfirmSignUp from "./webpages/signup/Confirm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
        .then((response) => { return response.json();
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
            path="/login" element={<Login />}
          />
          <Route
            path="/signup/success" element={<SuccessfulSignUp /> }
          />
          <Route
            path="/signup/confirm" element={ <ConfirmSignUp /> }
          />
          <Route
            path="/create" element={<CreateBar />}
          />
          <Route
            path="/preview/chart_1" element={<BarPreview />}
          />
          <Route
            path="/preview/chart_2" element={<SimplePreview />}
          />
          <Route
            path="/preview/chart_3" element={<ScatterPreview />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;