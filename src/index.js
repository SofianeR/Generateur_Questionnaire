import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { transitions, positions, Provider as AlertProvider } from "react-alert";

const AlertTemplate = ({ message, color }) => (
  <div
    style={{
      padding: "20px",
      marginRight: "70px",
      marginBottom: "30px",

      borderRadius: "5px",

      backgroundColor: "#62C188",

      color: "white",
      fontWeight: "bloder",
    }}>
    {message}
  </div>
);

const options = {
  position: positions.BOTTOM_RIGHT,
  timeout: 3000,
  offset: "20px",

  transition: transitions.FADE,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </React.StrictMode>
);
