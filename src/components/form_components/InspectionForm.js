import React, { useState } from "react";
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";

import { PlusOutlined } from "@ant-design/icons";
// import { fetchUserQuestions } from "../../dataStore/apiFetchTest";
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Upload,
  Modal,
} from "antd";

import { InspectionModal } from "./InspectionModal";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

export const InspectionForm = () => {
  //   const { data } = useRecoilValue(fetchUserQuestions);
  //   const userQuestions = data;

  return (
    <>
      <div className="two-column-container vertical-center split-small">
        <div>
          <h1>Inspection Form</h1>
        </div>
        <div>
          <InspectionModal />
        </div>
      </div>
      <div>
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          // onValuesChange={onFormLayoutChange}
          // disabled={componentDisabled}
          style={{
            maxWidth: 600,
          }}
          size={"small"}
        >
          {/* {userQuestions.map((e, idx) => {
            return (
              <Form.Item key={idx} label={e.question}>
                <Radio.Group>
                  <Radio value="YES"> YES </Radio>
                  <Radio value="NO"> NO </Radio>
                </Radio.Group>
              </Form.Item>
            );
          })} */}
          <Form.Item label="Details">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button>Submit</Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
