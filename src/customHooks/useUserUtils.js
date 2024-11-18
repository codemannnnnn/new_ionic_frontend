// import React, { useState } from "react";
import axios from "axios";
// import cookie from "js-cookie";

// import { useAuthenticator } from "./useAuthenticator";

// const env = process.env.REACT_APP_ENVIRONMENT;
const baseUrl = process.env.REACT_APP_BASE_URL;

export const postDataWithNoAuth = (endpoint, body) => {
  return axios.post(`${baseUrl}/${endpoint}`, body);
};
export const postFormData = (body) => {
  console.log(body);
  axios
    .post(`${process.env.REACT_APP_BASE_URL}/form`, body)
    .then((res) => {})
    .catch((err) => {
      console.log(err);
    });
};

export const postNewEquipmentData = (body) => {
  // useEffect(() => {
  axios
    .post(`${process.env.REACT_APP_BASE_URL}/equipment`, body)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
