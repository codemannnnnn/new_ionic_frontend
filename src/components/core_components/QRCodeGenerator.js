import { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { Button, Form, Input, Space, Card, Select, Modal, message } from "antd";
import { useStore, useGrabUserInformation } from "../../state/store";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function QRCodeGenerator() {
  const [url, setUrl] = useState(""); // URL to encode
  const [qrVisible, setQrVisible] = useState(false);
  const qrRef = useRef(null); // Reference to the QR code div
  const [open, setOpen] = useState(false);
  const [qrModal, setQrModal] = useState(false);
  const formData = useStore((state) => state.formInfo);
  const userData = useStore((state) => state.userInfo);
  const qrCodes = useStore((state) => state.qrCodes);
  // console.log(qrCodes);

  const [cleanFormData, setCleanFormData] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);

  const [qrCodeBase64, setQrCodeBase64] = useState(null);
  const [curFormId, setCurFormId] = useState(null);
  const [qrCodeLabel, setQrCodeLabel] = useState(null);

  const [generateQRCodeLoading, setGenerateQRCodeLoading] = useState(false);

  const [equipmentActive, setEquipmentActive] = useState("");
  const [showQRCodeDiv, setShowQRCodeDiv] = useState("");
  const [formActive, setFormActive] = useState("");
  const [createQRCodeButton, setcreateQRCodeButton] =
    useState("Create QR Code");
  const [showQRCodes, setshowQRCodes] = useState("View QR Codes");
  const [formButtonTitle, setFormButtonTitle] = useState("Add Form");
  const fetchData = useGrabUserInformation();
  // const useHandleFetchUserInfo = () => {
  // useGrabUserInformation();
  //   grabData(); // Call the function returned by the hook
  // };

  // Example button to trigger it
  // <Button onClick={handleFetchUserInfo}>Fetch User Info</Button>
  // const [confirmLoading, setConfirmLoading] = useState(false);
  // const [loading, setLoading] = useState(false); // Step 1: State for loading

  const [form] = Form.useForm();

  const handleGenerateQRCode = () => {
    const element = document;
    //   .getElementById("qr-select-active")
    //   .getAttribute("data-value");
    // if (!element) return;
    // setSelectedForm(element);
    // console.log(element.getAttribute("data-value"), "selectedForm");
    setUrl(
      `${process.env.REACT_APP_BASE_FRONTEND_URL}/forms?form=${curFormId}`
    ); // Set your endpoint here
    setQrVisible(true);
    setGenerateQRCodeLoading(true);
    setTimeout(() => {
      hiddenSaveButton();
      setEquipmentActive(equipmentActive === "" ? "active" : "");
      setcreateQRCodeButton(
        createQRCodeButton === "Create QR Code" ? "Close" : "Create QR Code"
      );
      setQrModal(true);
      setGenerateQRCodeLoading(false);
      resetQRCodeForm();
      fetchData();
      message.success("New QR Code Generated");
    }, 1000);
  };

  useEffect(() => {
    // console.log("changed");
    if (qrVisible) {
      handleSaveQRCode();
    }
  }, [qrVisible]);

  const handleSaveQRCode = async () => {
    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;

    // Convert SVG to Base64 PNG
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const pngBase64 = canvas.toDataURL("image/png");

      console.log("Base64 Image:", pngBase64);

      // Here you would send `pngBase64` to your database
      // Example:
      // await fetch("/api/saveQrCode", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ image: pngBase64 }),
      // });
      setQrCodeBase64(pngBase64);
    };

    img.src = url;
  };
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
      setQrCodeLabel(values.name);
      const postData = {
        qrcode_id: uuidv4(),
        qrcode_img: qrCodeBase64,
        form_id: curFormId,
        qrcode_label: values.name,
        user_id: userData.user_id,
        organization_id: userData.organization_id,
        qrcode_address: url,
      };
      console.log(postData);
      postToBackEnd(postData);
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
  // console.log(process.env.REACT_APP_BASE_URL);

  const postToBackEnd = async (body) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/qrcode/saveqrcode`,
        body
      );
      console.log("QR Code saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving QR Code:", error);
    }
  };

  const handleCreateQRCode = (e) => {
    var curVal = e.target.innerText;
    if (curVal === "Create QR Code") {
      setEquipmentActive(equipmentActive === "" ? "active" : "");
      setcreateQRCodeButton(
        createQRCodeButton === "Create QR Code" ? "Close" : "Create QR Code"
      );
    } else if (curVal === "Close") {
      setEquipmentActive(equipmentActive === "" ? "active" : "");
      setcreateQRCodeButton(
        createQRCodeButton === "Create QR Code" ? "Close" : "Create QR Code"
      );
      // setFormActive(formActive === "" ? "active" : "");
      // setFormButtonTitle(formButtonTitle === "Add Form" ? "Close" : "Add Form");
    }
  };

  const handleViewQRCode = (e) => {
    var curVal = e.target.innerText;
    if (curVal === "View QR Codes") {
      setShowQRCodeDiv(showQRCodeDiv === "" ? "active" : "");
      setshowQRCodes(
        showQRCodes === "View QR Codes" ? "Close" : "View QR Codes"
      );
    } else if (curVal === "Close") {
      setShowQRCodeDiv(showQRCodeDiv === "" ? "active" : "");
      setshowQRCodes(
        showQRCodes === "View QR Codes" ? "Close" : "View QR Codes"
      );
      // setFormActive(formActive === "" ? "active" : "");
      // setFormButtonTitle(formButtonTitle === "Add Form" ? "Close" : "Add Form");
    }
  };

  const hiddenSaveButton = () => {
    const saveButton = document.querySelector("#qrcode-submit-button button");
    if (saveButton) {
      // saveButton.style.display = "none";
      saveButton.click();
    }
  };

  const resetQRCodeForm = () => {
    const resetButton = document.querySelector(
      "#qrcodeForm > div > div:nth-child(1) > div:nth-child(2) > div > div > div > div > div > div > div:nth-child(3) > button"
    );
    if (resetButton) {
      resetButton.click();
    }
  };

  const handleChange = (value) => {
    // console.log(`selected ${value}`);
    setCurFormId(value);
  };

  // console.log(qrCodeBase64);

  useEffect(() => {
    formData.map((e, index) => {
      setCleanFormData((prevData) => {
        const uniqueForms = new Map(prevData.map((item) => [item.label, item]));
        if (!uniqueForms.has(e.data.form_title)) {
          uniqueForms.set(e.data.form_title, {
            key: `${e.data.form_title}-${index}-${uuidv4()}`,
            value: `${e.data.form_id}`,
            label: e.data.form_title,
          });
          // setCurFormId(e.data.form_id);
        }
        return Array.from(uniqueForms.values());
      });
    });
  }, [formData]);
  const handlePrint = (qrCode) => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print QR Code</title>
          </head>
          <body>
            <div style="text-align: center;">
              <p>${qrCode.qrcode_label}</p>
              <img src="${qrCode.qrcode_img}" alt="QR Code" style="width: 150px; height: 150px;" />
            </div>
            <script>
              window.onload = function() {
                window.print();
                window.close();
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };
  // console.log(curFormId);

  return (
    <div className="p-4">
      <Button type="" onClick={handleViewQRCode}>
        {showQRCodes}
      </Button>

      <Button
        type="primary"
        onClick={handleCreateQRCode}
        style={{ marginLeft: "10px" }}
      >
        {createQRCodeButton}
      </Button>
      <div className={`fade-in-flex ${equipmentActive}`}>
        <Form
          form={form}
          name="qrcodeForm"
          layout="vertical"
          autoComplete="off"
          style={{ width: "100%" }}
        >
          <div
          // style={{
          //   display: "flex",
          //   flexDirection: "row",
          //   // alignItems: "center",
          // }}
          >
            <div>
              <div>
                <Form.Item
                  name="form_choice"
                  label="Please choose a form."
                  // rules={[{ required: true }]}
                >
                  <Space wrap>
                    <Select
                      defaultValue="Options..."
                      style={{ width: 200 }}
                      onChange={handleChange}
                      options={cleanFormData}
                    />
                  </Space>
                </Form.Item>
                <Form.Item
                  name="name"
                  label="Name"
                  style={{ width: 200 }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div>
                <Form.Item>
                  <Space>
                    <Button
                      type="primary"
                      onClick={handleGenerateQRCode}
                      loading={generateQRCodeLoading}
                    >
                      Generate QR Code
                    </Button>
                    <span id="qrcode-submit-button" style={{ display: "none" }}>
                      <SubmitButton form={form}>Submit</SubmitButton>
                    </span>
                    <Button htmlType="reset">Reset</Button>
                  </Space>
                </Form.Item>
              </div>
              {qrVisible && (
                <div style={{ display: "none" }} className="mt-4" ref={qrRef}>
                  <QRCode value={url} size={100} />
                </div>
              )}
            </div>
            <div>
              <Modal
                open={qrModal}
                width="20%"
                title={qrCodeLabel}
                okText="Create"
                footer={null} // Remove the footer to hide the "OK" button
                cancelText="Cancel"
                onCancel={() => {
                  setQrModal(false);
                }}
              >
                {qrVisible && (
                  <div className="mt-4" ref={qrRef}>
                    <QRCode value={url} size={100} />
                  </div>
                )}
              </Modal>
            </div>
          </div>
        </Form>
        {/* <Space wrap>
          <Select
            defaultValue="Options..."
            style={{ width: 200 }}
            onChange={handleChange}
            options={cleanFormData}
          />
        </Space> */}
      </div>

      <div className={`fade-in-flex ${showQRCodeDiv}`}>
        {" "}
        <div className="qr-code-grid">
          {qrCodes.map((e) => {
            return (
              <div key={e.qrcode_id} className="qr-code-item">
                <div>
                  <p>{e.qrcode_label}</p>
                  <img
                    src={e.qrcode_img}
                    alt="QR Code"
                    style={{ width: 75, height: 75 }}
                  />
                  <Button
                    style={{ width: "75px" }}
                    onClick={() => handlePrint(e)}
                  >
                    Print
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
