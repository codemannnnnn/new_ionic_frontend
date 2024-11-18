import { useEffect, useState } from "react";
import { create } from "zustand";
import axios from "axios";
import { persist } from "zustand/middleware";
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
  // const cookies = cookie.parse(document.cookie);
  // console.log(cookie.parse(document.cookie).userID, "cody");
  const userIDfromCookie = cookie.parse(document.cookie).userID;
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/user_data/${userIDfromCookie}`)
      // `${process.env.REACT_APP_BASE_URL}/user_data/1`

      .then((res) => {
        // console.log(res.data.equipment, "cody");
        setEquipment(res.data.equipment);
        setUserInfo(res.data.user);
        setFormInfo(res.data.form);
        setQuestions(res.data.form[0].formQuestions);
        // console.log(res.data);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [setEquipment, setQuestions, setFormInfo, setUserInfo]);
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
  // const setUserInfo = useStore((e) => e.setUserInfo);
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
      // .then(
      //   axios
      //     .get(
      //       `${process.env.REACT_APP_BASE_URL}/user_data/${useStore.userID}`
      //       // `${process.env.REACT_APP_BASE_URL}/user_data/1`
      //     )
      //     .then((res) => {
      //       // console.log(res.data.equipment, "cody");
      //       setEquipment(res.data.equipment);
      //       setUserInfo(res.data.user);
      //       setFormInfo(res.data.form);
      //       setQuestions(res.data.form[0].formQuestions);
      //       // console.log(res.data);
      //     })

      //     .catch((err) => {
      //       console.log(err);
      //     })
      // );
      const serializedCookie = cookie.serialize(
        "userID",
        response.data.user.user_id
        // ,
        // {
        //   maxAge: 1, // Set the cookie to expire immediately
        //   path: "/",
        // }
      );
      // Set the cookie in the document
      document.cookie = serializedCookie;
      setUserInfo(response.data.user);
      setUserID(response.data.user.user_id);
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/user_data/${response.data.user.user_id}`
        )
        // `${process.env.REACT_APP_BASE_URL}/user_data/1`

        .then((res) => {
          // console.log(res.data.equipment, "cody");
          setEquipment(res.data.equipment);
          setUserInfo(res.data.user);
          setFormInfo(res.data.form);
          setQuestions(res.data.form[0].formQuestions);
          // console.log(res.data);
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
  // const setUserInfo = useStore((e) => e.setUserInfo);
  const loginUser = async (
    username,
    password,
    firstName,
    lastName,
    organization_id
  ) => {
    try {
      // console.log(username, password, firstName, lastName, organization_id);
      const payload = {
        username,
        password,
        firstName,
        lastName,
        organization_id,
      }.username;
      console.log(payload);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/register`,
        payload
      );

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
  }, [userIDfromCookie]);

  return { dashboardInfo, error };
};
