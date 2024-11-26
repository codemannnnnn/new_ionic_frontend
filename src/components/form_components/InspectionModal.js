import { Button, Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { useStore } from "../../state/store";

// import { postDataWithAuth } from "../../dataStore/apiFetchTest";
import { postDataWithNoAuth } from "../../customHooks/useUserUtils";
const cookie = require("cookie");

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
  // console.log(form);
  return (
    <Modal
      open={open}
      title="Create a new form"
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
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        // initialValues={{
        //   modifier: "public",
        // }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input the title of collection of questions!",
            },
          ]}
        >
          <Input name="form_title" />
        </Form.Item>

        <Form.Item name="type" label="Type">
          <Select>
            <Select.Option value="forklift">Forklift</Select.Option>
          </Select>
        </Form.Item>
        {/* WIRE THIS UP IN THE BACKEND */}
        {/* <Form.Item
          name="hours"
          label="Hours"
          rules={[
            {
              required: true,
              message: "Please input the hours!",
            },
          ]}
        >
          <Input name="form_hours" />
        </Form.Item> */}
        {/* WIRE THIS UP IN THE BACKEND */}
        {/* <Form.Item
          name="notes"
          label="Notes"
          rules={[
            {
              required: true,
              message: "Please input the notes here!",
            },
          ]}
        >
          <Input name="form_notes" />
        </Form.Item> */}
        <Form.Item name="question-1" label="Question">
          <Input type="textarea" />
        </Form.Item>
        {questionArr.map((e, idx) => {
          return (
            <Form.Item key={idx} name={`question-${idx + 2}`} label="Question">
              <Input type="textarea" />
            </Form.Item>
          );
        })}
        <Form.Item>
          <Button type="primary" onClick={addOneToQuestionArray}>
            Add More
          </Button>
          <Button style={{ marginLeft: "8px" }} onClick={resetForm}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export const InspectionModal = () => {
  const [open, setOpen] = useState(false);
  // console.log("form");
  const userData = useStore((state) => state.userInfo);

  const postToBackEnd = (data) => {
    // const USERID = localStorage.getItem("id");
    const cookieUserID = cookie.parse(document.cookie).userID;
    console.log({ cookieUserID });
    // const USERID = 1
    const formId = uuidv4();
    const formTitle = data.title;
    const endpoint = "form/template";
    const dataToArr = Object.entries(data);
    const preppedData = [];
    console.log(dataToArr);

    dataToArr.slice(2).forEach((e, idx) => {
      // console.log(e);
      // const question = `question-${idx}`;
      if (e[1]) {
        const obj = {
          question: e[1],
          question_id: uuidv4(),
          user_id: cookieUserID,
          form_id: formId,
        };
        preppedData.push(obj);
      }
    });
    const formQuestionDataBlob = [];
    formQuestionDataBlob.push({
      form_id: formId,
      form_title: formTitle,
      form_type: data.type,
      user_id: cookieUserID,
      questions: preppedData,
      organization_id: userData.organization_id,
      form_template_id: uuidv4(),
      created_at: moment().toISOString(),
    });
    postDataWithNoAuth(endpoint, ...formQuestionDataBlob);
  };

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    postToBackEnd(values);
    setOpen(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Create Form
      </Button>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};
