import { Button, Form, Input, Modal, Radio, Select } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// import { postDataWithAuth } from "../../dataStore/apiFetchTest";

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

  const postToBackEnd = (data) => {
    const USERID = localStorage.getItem("id");
    const formId = uuidv4();
    const formTitle = data.title;
    const endpoint = "form";
    const dataToArr = Object.entries(data);
    const preppedData = [];
    dataToArr.slice(1).forEach((e, idx) => {
      const question = `question-${idx}`;
      const obj = {
        question: e[1],
        user_id: USERID,
        form_id: formId,
      };

      preppedData.push(obj);
    });
    const formQuestionDataBlob = [];
    formQuestionDataBlob.push({
      form_id: formId,
      title: formTitle,
      form_type: data.type,
      user_id: USERID,
      questions: preppedData,
    });

    // postDataWithAuth(endpoint, ...formQuestionDataBlob);
  };

  const onCreate = (values) => {
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
