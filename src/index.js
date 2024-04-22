import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

//recoil
import { RecoilRoot } from "recoil";
import RecoilNexus from "recoil-nexus";
// import { PersistGate } from "recoil-persist/integration";

//react router
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Router,
  BrowserRouter,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    {/* <PersistGate> */}
    {/* <RecoilNexus /> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </PersistGate> */}
  </RecoilRoot>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
