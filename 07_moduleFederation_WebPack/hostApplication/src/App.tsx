import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home";
import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  return (
    <div className="global_app_container">
      <div className="app_navbar_container">
        <Navbar />
      </div>
      <div className="appContentContainer">
        <Home />
      </div>
      <div className="app_footer_container">
        <Footer />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
