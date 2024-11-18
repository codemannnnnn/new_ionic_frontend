import React, { useState } from "react";
import axios from "axios";
import cookie from "js-cookie";

import { useAuthenticator } from "./useAuthenticator";

const env = process.env.REACT_APP_ENVIRONMENT;
const baseUrl = process.env.REACT_APP_BASE_URL;
// env === "DEV"
//   ? process.env.REACT_APP_BASE_URL
//   : process.env.REACT_APP_BASE_API_URL;

//Custom hook to post form data
//sample json this endpoint expects.
// {
//   "form_id":"b7922060-fa3b-4368-ad6f-2cdcc25d8c48",
//   "title":"Sample Seed Form",
//   "form_type":"forklift",
//   "user_id":1,
//   "organization_id":1,
//   "form_template_id":"10f6e916-df19-46da-bb91-b2fe0f3e55ba",
//   "created_at":"2024-05-27T03:34:56.228Z",
//   "questions":[
//      {
//         "question":"same form template id."
//      },
//      {
//         "question":"different form id."
//      }
//   ]
// }
// console.log({ baseUrl });
export const postDataWithNoAuth = (endpoint, body) => {
  return axios.post(`${baseUrl}/${endpoint}`, body);
};
export const postFormData = (body) => {
  // useEffect(() => {
  console.log(body);
  axios
    .post(`${process.env.REACT_APP_BASE_URL}/form`, body)
    .then((res) => {
      // console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  // }, [dataToPost]);
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
  // }, [dataToPost]);
};

// export function useUserUtils() {
//   // const nav = useNavigate();
//   const {
//     checkIfUserIsLoggedIn,
//     getAuthData,
//     postDataWithAuth,
//     postDataWithNoAuth,
//   } = useAuthenticator();
//   const [userData, setUserData] = useRecoilState(atomUserData);

//   const logUserIn = (data) => {
//     const targetUrl = "auth/login";
//     postDataWithNoAuth(targetUrl, data)
//       .then((res) => {
//         cookie.set("token", res.data.token);
//         if (res.status === 200) {
//           setUserData([res.data]);
//           // nav("/dashboard");
//         }
//       })
//       .catch((err) => {
//         // nav("/error");
//       });
//   };
//   return {
//     // registerUser,
//     logUserIn,
//     // logUserOut,
//     // authenticateRequest,
//     // grabDataWithAuth,
//   };
// }
