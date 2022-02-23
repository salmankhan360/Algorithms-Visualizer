import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { AudioPlayerProvider } from "react-use-audio-player";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <AudioPlayerProvider>
      <App />
    </AudioPlayerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
