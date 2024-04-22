import React, { useEffect, useState } from "react";
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { Space, Table, Tag, Button, Modal, Checkbox } from "antd";

// import { fetchUserInfo } from "../../dataStore/apiFetchTest";

//actions to take when the form is clicked.
const url = process.env.REACT_APP_BASE_URL;

export const EquipmentGrid = () => {
  const [questionModalData, setQuestionModalData] = useState([]);
  //   const testData = useRecoilValue(fetchUserInfo);
  //   const { data } = testData;
  const gridDataArr = [];
  const questionDataArr = [];
  //   console.log({ data });

  //modal for questions
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState([]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //deal with modal onces it's up
  const processYesNoClick = (e) => {
    Array.from(e.target.parentElement.children).forEach((sib) => {
      sib.classList.remove("btn-prim");
      sib.classList.add("btn-non-prim");
    });
    e.target.classList.add("btn-prim");
  };
  //
  //   data.info.forEach((e, idx) => {
  //     var gridDataObj = {
  //       key: idx,
  //       name: e.data.title,
  //       age: 10,
  //       type: e.data.form_type,
  //       questions: e.formQuestions,
  //     };
  //     var questionDataObj = {
  //       name: e.data.title,
  //       questions: e.formQuestions,
  //     };
  //     gridDataArr.push(gridDataObj);
  //     questionDataArr.push(questionDataObj);
  //   });

  useEffect(() => {
    setQuestionModalData(questionDataArr);
  }, []);

  const formClicked = (e) => {
    questionModalData.forEach((j) => {
      if (j.name !== e.target.text) {
        return;
      } else {
        showModal();
        setModalTitle(j.name);
        setModalData(
          j.questions.map((k, idx) => {
            return (
              <div
                key={idx}
                className="homebar-menu split-large vertical-center six-vh"
              >
                <div>{k.question}</div>
                <div>
                  {" "}
                  {/* <Space wrap> */}
                  <button className="btn-non-prim" onClick={processYesNoClick}>
                    Yes
                  </button>
                  <button className="btn-non-prim" onClick={processYesNoClick}>
                    No
                  </button>
                  {/* </Space> */}
                </div>
              </div>
            );
          })
        );
      }
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => {
        return <a onClick={formClicked}>{text}</a>;
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>Form Center</h1>
      <Table columns={columns} dataSource={gridDataArr} />
      <Modal
        title={modalTitle}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>{modalData}</div>
      </Modal>
    </div>
  );
};
