import { useEffect, useState } from "react";
import { create } from "zustand";
import axios from "axios";
import { persist } from "zustand/middleware";
import { useHistory } from "react-router-dom";
const cookie = require("cookie");

export const useStore = create(
  persist(
    (set) => ({
      userInfo: [],
      setUserInfo: (user) => set({ userInfo: user }),
      formInfo: [],
      setFormInfo: (form) => set({ formInfo: form }),
      questions: [],
      setQuestions: (questions) => set({ questions: questions }),
      equipment: [],
      setEquipment: (equipment) => set({ equipment: equipment }),
      userID: [],
      setUserID: (userID) => set({ userID: userID }),
      dashboardInfo: [],
      setDashboardInfo: (dashboardInfo) =>
        set({ dashboardInfo: dashboardInfo }),
      setQRCodes: (qrCodes) => set({ qrCodes: qrCodes }),
      qrCodes: [],
    }),

    {
      name: "user-storage", // unique name
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    }
  )
);

// Custom hook for User Information API calls
export const useGrabUserInformation = () => {
  const setUserInfo = useStore((e) => e.setUserInfo);
  const setFormInfo = useStore((e) => e.setFormInfo);
  const setQuestions = useStore((e) => e.setQuestions);
  const setEquipment = useStore((e) => e.setEquipment);
  const setQRCodes = useStore((e) => e.setQRCodes);
  const userIDfromCookie = cookie.parse(document.cookie).userID;

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user_data/${userIDfromCookie}`
      );

      // Update the store with the fetched data
      setEquipment(res.data.equipment);
      setUserInfo(res.data.user);
      setFormInfo(res.data.form);
      setQuestions(res.data.form[0].formQuestions);
      setQRCodes(res.data.qrcode);
    } catch (err) {
      console.error("Error fetching user information:", err);
    }
  };

  return fetchData; // Return the function so it can be called explicitly
};

// export const usePullTheDataIn = () => {
//   const setUserInfo = useStore((e) => e.setUserInfo);
//   const setFormInfo = useStore((e) => e.setFormInfo);
//   const setQuestions = useStore((e) => e.setQuestions);
//   const setEquipment = useStore((e) => e.setEquipment);
//   const userIDfromCookie = cookie.parse(document.cookie).userID;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(
//           `${process.env.REACT_APP_BASE_URL}/user_data/${userIDfromCookie}`
//         );
//         setEquipment(res.data.equipment);
//         setUserInfo(res.data.user);
//         setFormInfo(res.data.form);
//         setQuestions(res.data.form[0].formQuestions);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchData();
//   }, [setEquipment, setQuestions, setFormInfo, setUserInfo]);
// };

// Custom hook for User Login
export const useLoginUser = () => {
  // const loadData = useGrabUserInformation();

  const setUserInfo = useStore((e) => e.setUserInfo);
  const setUserID = useStore((e) => e.setUserID);
  const setFormInfo = useStore((e) => e.setFormInfo);
  const setQuestions = useStore((e) => e.setQuestions);
  const setEquipment = useStore((e) => e.setEquipment);
  const loginUser = async (username, password) => {
    try {
      const payload = {
        username,
        password,
      }.username;
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        payload
      );
      const serializedCookie = cookie.serialize(
        "userID",
        response.data.user.user_id
      );
      // Set the cookie in the document
      document.cookie = serializedCookie;
      setUserInfo(response.data.user);
      setUserID(response.data.user.user_id);
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/user_data/${response.data.user.user_id}`
        )
        .then((res) => {
          setEquipment(res.data.equipment);
          setUserInfo(res.data.user);
          setFormInfo(res.data.form);
          setQuestions(res.data.form[0].formQuestions);
        })
        .catch((err) => {
          console.log(err);
        });

      return response.data;
    } catch (error) {
      // usePullTheDataIn();
      throw error;
    }
  };
  // usePullTheDataIn();
  return loginUser;
};

// Custom hook for User Registration
export const useRegisterUser = () => {
  const history = useHistory();
  const setUserInfo = useStore((e) => e.setUserInfo);
  const setUserID = useStore((e) => e.setUserID);
  const setFormInfo = useStore((e) => e.setFormInfo);
  const setQuestions = useStore((e) => e.setQuestions);
  const setEquipment = useStore((e) => e.setEquipment);
  // const setUserInfo = useStore((e) => e.setUserInfo);
  const loginUser = async (
    username,
    password,
    firstName,
    lastName,
    organization_id,
    role_id
  ) => {
    try {
      const registerPayload = {
        username,
        password,
        firstName,
        lastName,
        organization_id,
        role_id, //hardcoded for now (operators.)
      }.username;
      console.log({ registerPayload });
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/register`,
        registerPayload
      );
      try {
        const loginPayload = {
          username,
          password,
        }.username;
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/auth/login`,
          loginPayload
        );
        const serializedCookie = cookie.serialize(
          "userID",
          response.data.user.user_id
        );
        // Set the cookie in the document
        document.cookie = serializedCookie;
        setUserInfo(response.data.user);
        setUserID(response.data.user.user_id);
        axios
          .get(
            `${process.env.REACT_APP_BASE_URL}/user_data/${response.data.user.user_id}`
          )
          .then((res) => {
            setEquipment(res.data.equipment);
            setUserInfo(res.data.user);
            setFormInfo(res.data.form);
            setQuestions(res.data.form[0].formQuestions);
          })
          .catch((err) => {
            console.log(err);
          });
        history.push("/dashboard");

        return response.data;
      } catch (error) {
        throw error;
      }

      // setUserInfo(response.data.user);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  return loginUser;
};

// Custom hook for User Logout
export const useLogoutUser = () => {
  const setUserInfo = useStore((e) => e.setUserInfo);
  const setFormInfo = useStore((e) => e.setFormInfo);
  const setQuestions = useStore((e) => e.setQuestions);
  const setEquipment = useStore((e) => e.setEquipment);
  const setUserID = useStore((e) => e.setUserID);
  const setDashboardInfo = useStore((e) => e.setDashboardInfo);
  const logoutUser = () => {
    // Clear the store
    setUserInfo([]);
    setFormInfo([]);
    setQuestions([]);
    setEquipment([]);
    setUserID([]);
    setDashboardInfo([]);

    // Clear the cookie
    document.cookie = cookie.serialize("userID", "", {
      maxAge: -1, // Set the cookie to expire immediately
      path: "/",
    });
  };

  return logoutUser;
};

// Custom hook for fetching Dashboard Information
export const useFetchDashboardInfo = () => {
  const dashboardInfo = useStore((state) => state.dashboardInfo);
  const setDashboardInfo = useStore((state) => state.setDashboardInfo);
  const [error, setError] = useState(null);
  const userIDfromCookie = cookie.parse(document.cookie).userID;

  useEffect(() => {
    const fetchDashboardInfo = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/user_data/dashboardinfo/${userIDfromCookie}`
        );
        setDashboardInfo(response.data);
      } catch (err) {
        setError(err);
      }
    };

    if (userIDfromCookie) {
      fetchDashboardInfo();
    }
  }, [userIDfromCookie, setDashboardInfo]);

  return { dashboardInfo, error };
};
