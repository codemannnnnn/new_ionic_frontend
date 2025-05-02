import React, { useState, useEffect } from "react";

// import { settingsOutline } from "ionicons/icons";
import { IonPage } from "@ionic/react";
import { Button, Form, Input, Space, Card, Select } from "antd";
// import moment from "moment";
import { v4 as uuidv4 } from "uuid";

import { postNewEquipmentData } from "../../customHooks/useUserUtils";
import { InspectionModal } from "../form_components/InspectionModal";
import { useStore } from "../../state/store";
import QRCodeGenerator from "./QRCodeGenerator";

export const Settings = () => {
  // const [name, setName] = useState("");
  // const [type, setType] = useState("");
  const userData = useStore((state) => state.userInfo);

  const [equipmentActive, setEquipmentActive] = useState("");
  const [formActive, setFormActive] = useState("");
  const [equipmentButtonTitle, setEquipmentButtonTitle] =
    useState("Add Equipment");
  const [formButtonTitle, setFormButtonTitle] = useState("Add Form");

  // const [confirmLoading, setConfirmLoading] = useState(false);
  // const [loading, setLoading] = useState(false); // Step 1: State for loading

  const [form] = Form.useForm();

  const SubmitButton = ({ form, children }) => {
    const [submittable, setSubmittable] = useState(false);

    // Watch all values
    const values = Form.useWatch([], form);
    // console.log(values.name);
    // setName = values.name;
    // setType = values.type;
    useEffect(() => {
      form
        .validateFields({
          validateOnly: true,
        })
        .then(() => setSubmittable(true))
        .catch(() => setSubmittable(false));
    }, [form, values]);

    const handleSubmit = () => {
      const postData = {
        equipment_id: uuidv4(),
        name: values.name,
        type: values.type,
        organization_id: userData.organization_id,
        user_id: userData.user_id,
      };
      // console.log(postData);
      // console.log(userData);

      postNewEquipmentData(postData);
      // useGrabUserInformation();
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

  const handleOpen = (e) => {
    var curVal = e.target.innerText;
    // console.log(curVal);
    if (curVal === "Add Equipment") {
      setEquipmentActive(equipmentActive === "" ? "active" : "");
      setEquipmentButtonTitle(
        equipmentButtonTitle === "Add Equipment" ? "Close" : "Add Equipment"
      );
    }
    // else if (curVal === "Add Form") {
    //   setFormActive(formActive === "" ? "active" : "");
    //   setFormButtonTitle(formButtonTitle === "Add Form" ? "Close" : "Add Form");
    // }
    else if (curVal === "Close") {
      setEquipmentActive(equipmentActive === "" ? "active" : "");
      setEquipmentButtonTitle(
        equipmentButtonTitle === "Add Equipment" ? "Close" : "Add Equipment"
      );
      setFormActive(formActive === "" ? "active" : "");
      setFormButtonTitle(formButtonTitle === "Add Form" ? "Close" : "Add Form");
    }
  };

  return (
    <>
      <IonPage>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            // border: "1px solid #e8e8e8",
            // margin: "2%",
            // padding: "2%",
            justifyContent: "space-between",
          }}
        >
          <Card>
            <div
              title=""
              // bordered={false}
              style={{
                textAlign: "left",
                // border: "1px solid red",
              }}
            >
              {/* <h6>Add New Equipment</h6> */}
              <div className="title">Equipment</div>
              <Button type="primary" onClick={handleOpen}>
                {equipmentButtonTitle}
              </Button>
              <div className={`fade-in-flex ${equipmentActive}`}>
                <Form
                  form={form}
                  name="equipmentForm"
                  layout="vertical"
                  autoComplete="off"
                  style={{ width: "100%" }}
                >
                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="type"
                    label="Type"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      options={[
                        {
                          label: "Forklift",
                          value: "forklift",
                        },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Space>
                      <SubmitButton form={form}>Submit</SubmitButton>
                      <Button htmlType="reset">Reset</Button>
                    </Space>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Card>

          {/* <Button type="primary" onClick={handleOpen} value="form">
            {formButtonTitle}
          </Button> */}
          {/* <div className={`fade-in-flex ${formActive}`}> */}

          <Card>
            <div
              title=""
              // bordered={false}
              style={{
                textAlign: "left",
                // border: "1px solid red",
              }}
            >
              <div className="title">Forms</div>

              <div>
                <InspectionModal />
              </div>
            </div>
          </Card>
          <Card>
            <div
              title=""
              // bordered={false}
              style={{
                textAlign: "left",
                // border: "1px solid red",
              }}
            >
              {/* <Button type="primary" onClick={handleOpen}> */}
              <div className="title">QR Code</div>

              <QRCodeGenerator />

              {/* </Button> */}
            </div>
          </Card>
        </div>
      </IonPage>
    </>
  );
};
