import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./webpages/Home";
import Login from "./webpages/login";
import About from "./webpages/About";
import UserCharts from "./webpages/UserCharts";
import Credits from "./webpages/Credits";
import UserInfo from "./webpages/UserInfo";
import ConfirmSignUp from "./webpages/signup/Confirm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import CreateBar from "./webpages/create/bar_chart";
import CreateSimple from "./webpages/create/chart_2";
import CreateScatter from "./webpages/create/chart_3";
import CreatePolar from "./webpages/create/chart_4";
import CreateStack from "./webpages/create/chart_5";
import CreateStem from "./webpages/create/chart_6";
import ProtectedRoutes from "./Protected";
import { UserProvider } from "./UserContext";
import Footer from './components/Footer';


const App = () => {

  return (
    <BrowserRouter>
      <div className="content">
      <UserProvider>
        <Navbar  />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup/confirm" element={<ConfirmSignUp />} />
          <Route path="/user/info" element={<UserInfo />} />
          <Route path="/create/chart_1" element={<CreateBar />} />
          <Route path="/create/chart_2" element={<CreateSimple />} />
          <Route path="/create/chart_3" element={<CreateScatter />} />
          <Route path="/create/chart_4" element={<CreatePolar />} />
          <Route path="/create/chart_5" element={<CreateStack />} />
          <Route path="/create/chart_6" element={<CreateStem />} />
          <Route path="/purchase" element={<Credits />} />
          <Route path="/user/charts" element={<UserCharts />} />
          <Route path="/About" element={<About />} />
          <Route path="/create/chart_6" element={<CreateStem />} />s
        </Routes>
        <Footer />
        </UserProvider>
      </div>
    </BrowserRouter>
  );
};

export default App;