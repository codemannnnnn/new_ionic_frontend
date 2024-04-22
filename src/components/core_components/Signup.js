import React, { useState } from "react";

// import {
//   fetchUserInfo,
//   fetchData,
//   postData,
// } from "../../dataStore/apiFetchTest";

import {
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";

// import { useNavigate } from "react-router-dom";

// import { authAtom, usersAtom } from "../../state/auth";

// import { useUserUtils } from "../Utils/userUtils";

export const Signup = () => {
  const [uName, setUname] = useState("");
  const [pass, setPass] = useState("");

  //   const userActions = useUserUtils();
  //   const { registerUser } = userActions;

  // const nav = useNavigate();

  // const curLocStorage = useRecoilValue(authAtom);
  // console.log(curLocStorage);

  const handleChange = (e) => {
    const targetId = e.target.id;
    const val = e.target.value;
    if (targetId === "username") {
      setUname(val);
    }
    if (targetId === "password") {
      setPass(val);
    }
  };

  const submitData = (e) => {
    e.preventDefault();
    const data = {
      username: uName,
      password: pass,
    };
    // registerUser(data);
  };

  return (
    <div>
      <h1>Sign Up Screen</h1>
      <form onSubmit={submitData}>
        <input
          name="username"
          value={uName}
          onChange={handleChange}
          id="username"
          placeholder="username"
          type="text"
        />
        <input
          name="password"
          value={pass}
          onChange={handleChange}
          id="password"
          placeholder="password"
          type="text"
        />
        <div>
          <button type="submit" value="users" name="submitBtn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
