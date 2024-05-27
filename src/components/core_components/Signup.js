import React, { useState } from "react";

import { IonPage } from "@ionic/react";

export const Signup = () => {
  const [uName, setUname] = useState("");
  const [pass, setPass] = useState("");

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
    <>
      <IonPage>
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
      </IonPage>
    </>
  );
};
