import React, { useState } from "react";
import axios from "axios";
import { Input, Button, Form, message } from "antd";
import { useHistory } from "react-router-dom";

const PasswordReset = () => {
  const [newPass, setNewPass] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setLoading(true);

  //     try {
  //       const response = await axios.post(
  //         `${process.env.REACT_APP_BASE_URL}/reset-password`,
  //         { newPass }
  //       );
  //       message.success("Password reset link sent to your newPass.");
  //     } catch (error) {
  //       message.error("Error sending password reset link.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  const handlePasswordReset = async (token, newPassword, email) => {
    // e.preventDefault();

    setLoading(true);
    console.log(token);
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/save-new-password`,
        {
          token,
          newPassword,
          email,
        }
      );
      message.success("Password has been reset successfully.");
      history.push("/login");
    } catch (error) {
      message.error("Error resetting password.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="password-reset" style={{ width: "50%", margin: "auto" }}>
      <h2>Reset Password</h2>
      <Form
        onFinish={(values) => {
          const urlParams = new URLSearchParams(window.location.search);
          //   const token = urlParams.get("token");
          const resetPasswordPath =
            window.location.pathname.split("/reset-password/")[1];
          const email = urlParams.get("email");
          handlePasswordReset(resetPasswordPath, newPass, email);
        }}
      >
        <Form.Item>
          <Input
            type="password"
            placeholder="Enter your new password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            required
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PasswordReset;
