import React, { useState, useEffect } from "react";

import { IonPage } from "@ionic/react";

import { useRegisterUser } from "../../state/store";
import { Form, Input, Button, Card, Space } from "antd";

export const Signup = () => {
  // const [uName, setUname] = useState("");
  // const [pass, setPass] = useState("");
  // const [fName, setFname] = useState("");
  // const [lName, setLname] = useState("");
  // const [orgID, setOrgID] = useState("");

  // const handleChange = (e) => {
  //   const targetId = e.target.id;
  //   const val = e.target.value;
  //   if (targetId === "username") {
  //     setUname(val);
  //   }
  //   if (targetId === "password") {
  //     setPass(val);
  //   }
  //   if (targetId === "firstName") {
  //     setFname(val);
  //   }
  //   if (targetId === "lastName") {
  //     setLname(val);
  //   }
  //   if (targetId === "organization_id") {
  //     setOrgID(val);
  //   }
  // };

  const registerUser = useRegisterUser();

  // const submitData = (e) => {
  //   e.preventDefault();
  //   const data = {
  //     username: uName,
  //     password: pass,
  //     firstName: fName,
  //     lastName: lName,
  //     organization_id: orgID,
  //   };
  //   // console.log(data);
  //   registerUser(data);
  // };
  const [signupForm] = Form.useForm();

  const SubmitButton = ({ signupForm, children }) => {
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

    const handleSubmit = (e) => {
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
        onClick={handleSubmit}
      >
        {children}
      </Button>
    );
  };

  return (
    <>
      <IonPage>
        <Card>
          <Form
            form={signupForm}
            name="validateOnly"
            layout="vertical"
            autoComplete="off"
            style={{ width: "100%" }}
          >
            <Form.Item
              name="username"
              label="username"
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
              label="password"
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
              label="firstName"
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
              label="lastName"
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
              label="organization_id"
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
                <SubmitButton signupForm={signupForm}>Submit</SubmitButton>
                {/* <Button htmlType="reset">Reset</Button> */}
              </Space>
            </Form.Item>
          </Form>
        </Card>
        {/* <div>
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
            <input
              name="firstName"
              value={fName}
              onChange={handleChange}
              id="firstName"
              placeholder="firstName"
              type="text"
            />
            <input
              name="lastName"
              value={lName}
              onChange={handleChange}
              id="lastName"
              placeholder="lastName"
              type="text"
            />
            <input
              name="organization_id"
              value={orgID}
              onChange={handleChange}
              id="organization_id"
              placeholder="organization_id"
              type="text"
            />
            <div>
              <button type="submit" value="users" name="submitBtn">
                Submit
              </button>
            </div>
          </form>
        </div> */}
      </IonPage>
    </>
  );
};
