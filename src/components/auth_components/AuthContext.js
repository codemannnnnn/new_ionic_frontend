import React, { createContext, useContext } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const checkAuth = () => {
    console.log("checkAuth");
    const userID = Cookies.get("userID");
    return !!userID;
  };

  return (
    <AuthContext.Provider value={{ checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  //   console.log("kkk");
  return useContext(AuthContext);
};
