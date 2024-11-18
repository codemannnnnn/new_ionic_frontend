import React from "react";
import { Navigate, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import { Login } from "../core_components/Login";

export const PrivateRoute = ({ children }) => {
  //   const isAuthenticated = AuthProvider();
  //   return isAuthenticated ? (
  //     children
  //   ) : (
  //     <Route exact path="/login" component={Login} />
  //   );
  //   return console.log("llkjlkjlk");
};
