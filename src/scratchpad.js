import { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { Button, Form, Input, Space, Card, Select, Modal } from "antd";
import { useStore, useGrabUserInformation } from "../../state/store";
import axios from "axios";

export default function QRCodeGenerator() {
  const [url, setUrl] = useState(""); // URL to encode
  const [qrVisible, setQrVisible] = useState(false);
  const qrRef = useRef(null); // Reference to the QR code div
  const [open, setOpen] = useState(false);
  const formData = useStore((state) => state.formInfo);
  const userData = useStore((state) => state.userInfo);

  const [cleanFormData, setCleanFormData] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);

  const [qrCodeBase64, setQrCodeBase64] = useState(null);
  const [curFormId, setCurFormId] = useState(null);
  const [curUserId, setCurUserId] = useState(null);
  const [curOrgId, setCurOrgId] = useState(null);

  const handleGenerateQRCode = () => {
    const element = document
      .getElementById("qr-select-active")
      .getAttribute("data-value");
    if (!element) return;
    setSelectedForm(element);
    // console.log(element.getAttribute("data-value"), "selectedForm");
    setUrl(`${process.env.REACT_APP_BASE_FRONTEND_URL}/forms?form=${element}`); // Set your endpoint here
    setQrVisible(true);
  };
  //   console.log(process.env.REACT_APP_BASE_FRONTEND_URL);
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

  const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const [questionArr, setQuestionArr] = useState(new Array(0).fill(1));
    const [initInputs, setInitInputs] = useState(1);

    const addOneToQuestionArray = () => {
      setQuestionArr(new Array(initInputs).fill(1));
      setInitInputs(initInputs + 1);
    };

    const resetForm = () => {
      setInitInputs(1);
      setQuestionArr(new Array(0).fill(1));
    };

    return (
      <Modal
        open={open}
        title="Generate New QR Code"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="type"
            label="Please select the form to use for this QR code."
          >
            <Select
              //   value={selectedForm || undefined} // Ensure the selected value persists
              onChange={(value) => {
                // setSelectedForm(value);
                const options = document.querySelectorAll(
                  ".ant-select-item-option"
                );
                options.forEach((option) => {
                  //   console.log(value, "id");
                  //   console.log(option.getAttribute("data-value"), "value");
                  if (option.getAttribute("data-value") === value) {
                    option.id = "qr-select-active";
                    // setCurFormId(value);
                  } else {
                    option.removeAttribute("id");
                  }
                });
              }}
            >
              {Array.from(
                new Map(formData.map((e) => [e.data.form_title, e])).values()
              ).map((e, idx) => (
                <Select.Option
                  key={idx}
                  value={e.data.form_id}
                  data-value={e.data.form_id} // Explicitly set data-value
                >
                  {e.data.form_title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={handleGenerateQRCode}>
              Generate QR Code
            </Button>

            {qrVisible && (
              <div className="mt-4" ref={qrRef}>
                <QRCode value={url} />
                <Button
                  onClick={handleSaveQRCode}
                  className="bg-green-500 text-white p-2 rounded mt-2"
                >
                  Save QR Code
                </Button>
              </div>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    const element = document.getElementById("qr-select-active");
    if (!element) return;
    setCurFormId(element.getAttribute("data-value"));
    // postToBackEnd(
    //   qrCodeBase64,
    //   curFormId,
    //   userData.user_id,
    //   userData.organization_id
    // );
    // console.log(
    //   qrCodeBase64,
    //   curFormId
    // userData.user_id,
    // userData.organization_ids
    // );

    // handleGenerateQRCode();
    setOpen(false);
  };

  // useEffect(() => {
  //   const element = document.getElementById("qr-select-active");
  //   if (!element) return;
  //   setCurFormId(element.getAttribute("data-value"));
  // }, [selectedForm]);

  const postToBackEnd = async (
    qrcode_img,
    form_id,
    user_id,
    organization_id
  ) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/saveQrCode`,
        {
          qrcode_img,
          form_id,
          user_id,
          organization_id,
        }
      );
      console.log("QR Code saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving QR Code:", error);
    }
  };

  return (
    <div className="p-4">
      {/* <Button
        onClick={handleGenerateQRCode}
        className="bg-blue-500 text-white p-2 rounded"
        type="primary"
      >
        Generate QR Code
      </Button>

      {qrVisible && (
        <div className="mt-4" ref={qrRef}>
          <QRCode value={url} />
          <Button
            onClick={handleSaveQRCode}
            className="bg-green-500 text-white p-2 rounded mt-2"
          >
            Save QR Code
          </Button>
        </div>
      )} */}
      <div>
        <Button
          type="primary"
          onClick={() => {
            setOpen(true);
            // handleGenerateQRCode();
          }}
        >
          Generate QR Code
        </Button>
        <CollectionCreateForm
          open={open}
          onCreate={onCreate}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </div>
    </div>
  );
}
