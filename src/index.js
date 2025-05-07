import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  // <React.StrictMode> this causes for two renders (dev mode only).
  <App />
  /* </React.StrictMode> */
);
