import React, { useState, useEffect } from "react";

import { IonPage } from "@ionic/react";

import { useHistory } from "react-router-dom";

import { useLoginUser, useRegisterUser } from "../../state/store";
import { Form, Input, Button, Card, Space } from "antd";
// import { v4 as uuidv4 } from "uuid";
// import { Signup } from "./Signup";
// import axios from "axios";
// const cookie = require("cookie");

export const Login = () => {
  const history = useHistory();
  //comp state
  const [uName, setUname] = useState("");
  const [pass, setPass] = useState("");
  const [LoginButtonSwitchView, setLoginButtonSwitchView] = useState("Signup");
  //env
  // const curEnv = process.env.REACT_APP_ENVIRONMENT;
  const [loginForm] = Form.useForm();
  // const grabData = useGrabUserInformation();
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
  const logUserIn = useLoginUser();
  // const loadData = useGrabUserInformation;

  const SubmitButton = ({ loginForm, children }) => {
    const [submittable, setSubmittable] = useState(false);

    // Watch all values
    const values = Form.useWatch([], loginForm);
    // console.log(values);
    useEffect(() => {
      loginForm
        .validateFields({
          validateOnly: true,
        })
        .then(() => {
          setSubmittable(true);
        })
        .catch(() => setSubmittable(false));
    }, [loginForm, values]);

    const useHandleSubmit = (e) => {
      const data = {
        username: values.loginusername,
        password: values.loginpassword,
      };

      const login = async () => {
        await logUserIn(data);
        history.push("/dashboard");
      };
      login();
    };
    return (
      <Button
        type="primary"
        htmlType="submit"
        disabled={!submittable}
        onClick={useHandleSubmit}
      >
        {children}
      </Button>
    );
  };

  const handleSwitch = (e) => {
    document.querySelector(".login").style.display = "none";
    document.querySelector(".signup").style.display = "flex";
    setLoginButtonSwitchView("Cancel");
    if (LoginButtonSwitchView === "Cancel") {
      document.querySelector(".login").style.display = "flex";
      document.querySelector(".signup").style.display = "none";
      setLoginButtonSwitchView("Signup");
    }
  };
  const registerUser = useRegisterUser();
  const [signupForm] = Form.useForm();

  const SignUpSubmitButton = ({ signupForm, children }) => {
    const [submittable, setSubmittable] = useState(false);

    // Watch all values
    const values = Form.useWatch([], signupForm);
    // console.log(values);
    useEffect(() => {
      signupForm
        .validateFields({
          validateOnly: true,
        })
        .then(() => setSubmittable(true))
        .catch(() => setSubmittable(false));
    }, [signupForm, values]);

    const useHandleSubmit = (e) => {
      const data = {
        username: values.username,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        organization_id: values.organization_id,
      };
      registerUser(data);
    };
    return (
      <Button
        type="primary"
        htmlType="submit"
        disabled={!submittable}
        onClick={useHandleSubmit}
      >
        {children}
      </Button>
    );
  };

  return (
    <>
      <IonPage
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "100vh",
          paddingTop: "20px",
        }}
      >
        <Card style={{ width: "50%" }}>
          <div className="login">
            <Form
              form={loginForm}
              name="validateOnly"
              layout="vertical"
              autoComplete="off"
              style={{ width: "100%" }}
              id="loginForm"
            >
              <Form.Item
                name="loginusername"
                label="Username"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="loginpassword"
                label="Password"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input type="password" />
              </Form.Item>
              <Form.Item>
                <Space>
                  <SubmitButton loginForm={loginForm}>Submit</SubmitButton>
                  <Button type="primary" onClick={handleSwitch}>
                    {LoginButtonSwitchView}
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
          <div className="signup" style={{ display: "none" }}>
            {/* <Signup className="signup" />{" "}
            <Button type="primary" onClick={handleSwitch}>
              {LoginButtonSwitchView}
            </Button> */}
            <Form
              form={signupForm}
              name="validateOnly"
              layout="vertical"
              autoComplete="off"
              style={{ width: "100%" }}
              id="signup"
            >
              <Form.Item
                name="username"
                label="Username"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input type="password" />
              </Form.Item>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="organization_id"
                label="Organization ID"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Space>
                  <SignUpSubmitButton signupForm={signupForm}>
                    Submit
                  </SignUpSubmitButton>
                  <Button type="primary" onClick={handleSwitch}>
                    {LoginButtonSwitchView}
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        </Card>
      </IonPage>
    </>
  );
};
