import { useState, useEffect } from "react";
import cookie from "js-cookie";
import axios from "axios";

// import { useNavigate } from "react-router-dom";

import { useRecoilState, useRecoilValue } from "recoil";
import { atomIsUserLoggedIn } from "../state/auth";
const env = process.env.REACT_APP_ENVIRONMENT;
const baseUrl =
  env === "DEV"
    ? process.env.REACT_APP_LOCAL_URL
    : process.env.REACT_APP_BASE_API_URL;

export function useAuthenticator() {
  const [userLoggedIn, setUserLoggedIn] = useRecoilState(atomIsUserLoggedIn);
  // const nav = useNavigate();

  const checkIfUserIsLoggedIn = () => {
    // cookie.set("auth_cookie", "valid.");
    const checkCookie = cookie.get("token");
    // if (checkCookie) {
    //   return;
    // }
    if (checkCookie) {
      setUserLoggedIn(true);
      // nav("/dashboard");
    } else {
      setUserLoggedIn(false);
    }
  };

  //get data req auth e.g. user is logged in and wants to retrieve their data
  const getAuthData = async (endpoint, auth) => {
    const url = `${baseUrl}/${endpoint}`;
    const getCall = await axios.get(url, auth);
    return getCall;
  };

  //post data with auth
  const postDataWithAuth = async (endpoint, incomingData) => {
    const url = `${baseUrl}/${endpoint}`;
    const dataBlob = incomingData;
    const auth = authenticateRequest();
    const postCall = await axios.post(url, dataBlob, auth);
    return postCall;
  };

  //post no auth data e.g. new user signs up
  const postDataWithNoAuth = async (endpoint, incomingData) => {
    const url = `${baseUrl}/${endpoint}`;
    const dataBlob = incomingData;
    const postCall = await axios.post(url, dataBlob);
    return postCall;
  };

  //interact with auth api
  const authenticateRequest = () => {
    const token = cookie.get("token");
    const authHeader = {
      headers: {
        Authorization: token,
      },
    };
    return authHeader;
  };

  return {
    checkIfUserIsLoggedIn,
    getAuthData,
    postDataWithAuth,
    postDataWithNoAuth,
  };
}
