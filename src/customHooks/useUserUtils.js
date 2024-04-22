import React, { useState } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import cookie from "js-cookie";
// import { useNavigate } from "react-router-dom";

import { useAuthenticator } from "./useAuthenticator";
import { atomUserData } from "../state/atomUserData";

const env = process.env.REACT_APP_ENVIRONMENT;
const baseUrl =
  env === "DEV"
    ? process.env.REACT_APP_LOCAL_URL
    : process.env.REACT_APP_BASE_API_URL;

export function useUserUtils() {
  // const nav = useNavigate();
  const {
    checkIfUserIsLoggedIn,
    getAuthData,
    postDataWithAuth,
    postDataWithNoAuth,
  } = useAuthenticator();
  const [userData, setUserData] = useRecoilState(atomUserData);

  const logUserIn = (data) => {
    const targetUrl = "auth/login";
    postDataWithNoAuth(targetUrl, data)
      .then((res) => {
        cookie.set("token", res.data.token);
        if (res.status === 200) {
          setUserData([res.data]);
          // nav("/dashboard");
        }
      })
      .catch((err) => {
        // nav("/error");
      });
  };
  return {
    // registerUser,
    logUserIn,
    // logUserOut,
    // authenticateRequest,
    // grabDataWithAuth,
  };
}
