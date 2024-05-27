import { useEffect } from "react";
import { create } from "zustand";
import axios from "axios";

// Define your storeqqq
export const useStore = create((set) => ({
  userInfo: [],
  setUserInfo: (user) => set({ userInfo: user }),
  formInfo: [],
  setFormInfo: (form) => set({ formInfo: form }),
  questions: [],
  setQuestions: (questions) => set({ questions: questions }),
}));

// Custom hook for User Information API calls
export const useGrabUserInformation = () => {
  const setUserInfo = useStore((e) => e.setUserInfo);
  const setFormInfo = useStore((e) => e.setFormInfo);
  const setQuestions = useStore((e) => e.setQuestions);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/user_data/1`).then((res) => {
      // console.log(res.data.user, "cody");
      setUserInfo(res.data.user);
      setFormInfo(res.data.form);
      setQuestions(res.data.form[0].formQuestions);
    });
  }, [setQuestions, setFormInfo, setUserInfo]);
};
