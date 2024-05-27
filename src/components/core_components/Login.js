import React, { useState } from "react";

import { IonPage } from "@ionic/react";

export const Login = () => {
  //comp state
  const [uName, setUname] = useState("");
  const [pass, setPass] = useState("");
  //env
  const curEnv = process.env.REACT_APP_ENVIRONMENT;

  // const nav = useNavigate();
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
    // logUserIn(data);
  };

  return (
    <>
      <IonPage>
        <div>
          <h1>Login Screen</h1>
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
              <button type="submit" value="auth/login" name="submitBtn">
                Submit
              </button>
            </div>
          </form>
        </div>
      </IonPage>
    </>
  );
};
