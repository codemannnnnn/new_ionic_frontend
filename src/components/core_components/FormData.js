import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useStore } from "../../state/store";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
// import { create } from "zustand";

import { checkmarkCircleOutline, closeCircleOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

export const FormData = () => {
  const [gridData, setGridData] = useState([]);

  const formData = useStore((state) => state.formInfo);
  const userData = useStore((state) => state.userInfo);
  const [loading, setLoading] = useState(true); // Add loading state

  // console.log("firing....");
  // useGrabUserInformation();
  const [sortedInfo, setSortedInfo] = useState({
    order: "descend",
    columnKey: "created_at",
  });

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      // pageSize: Math.floor((window.innerHeight - 200) / 50),
    },
  });

  //CODY DON'T FORGET THIS. THIS IS HOW YOU PULL CRAP INTO YOUR APP AFTER LOGIN.
  // const grabData = useGrabUserInformation();
  // useEffect(() => {
  //   grabData;
  // }, [formData]);

  const handleTableChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
    setTableParams({
      pagination,
    });
  };

  const YesIcon = () => (
    <IonIcon icon={checkmarkCircleOutline} style={{ color: "green" }} />
  );
  const NoIcon = () => (
    <IonIcon icon={closeCircleOutline} style={{ color: "red" }} />
  );

  // console.log(formData);
  // console.log({ gridData });
  useEffect(() => {
    if (formData) {
      var tempArr = [];
      // console.log(userData);
      //2 is the role_id for operator. show only that operators forms submitted.
      if (userData.role_id === 2) {
        formData.reduce((acc, e) => {
          if (e.userInfo.user_id === userData.user_id) {
            var { form_title, form_type, name, created_at } = e.data;
            var { firstName, lastName } = e.userInfo;
            created_at = created_at || "2024-08-09 16:36:00";
            firstName = firstName.toUpperCase();
            lastName = lastName.toUpperCase();
            name ? (name = name) : (name = "unknown");
            // const { form_id } = e.data;
            const { formQuestions } = e;

            form_title = <h6>{form_title}</h6>;

            const questionArr = formQuestions.map((question, idx) => {
              if (
                question.answer !== null &&
                question.answer !== undefined &&
                question.answer !== ""
              ) {
                return (
                  <div key={idx} className="form-grid-data">
                    <span className="font-small" style={{ width: "10px" }}>
                      {idx + 1}
                    </span>

                    <span className="font-mid " id="right-align">
                      {question.answer === true ? (
                        <YesIcon />
                      ) : question.answer === false ? (
                        <NoIcon />
                      ) : (
                        question.answer
                      )}
                    </span>
                    <span className="font-mid">{question.question}</span>
                  </div>
                );
              }
              return;
            });

            created_at = moment(created_at).format("YYYY-MM-DD HH:mm:ss");
            acc.push({
              key: uuidv4(),
              form_title: form_title,
              opearator_name: `${firstName} ${lastName}`,
              equipment_name: name.toUpperCase(),
              form_type: form_type.toUpperCase(),
              created_at: created_at,
              description: questionArr,
            });
          }
          return acc;
        }, tempArr);
      }
      //1 is the role_id for admin. show all forms submitted for that organization.
      if (userData.role_id === 1) {
        formData.map((e, idx) => {
          // console.log(e);
          // try {
          var { form_title, form_type, name, created_at } = e.data;
          var { firstName, lastName } = e.userInfo;
          // var { user_created_at } = e.formQuestions[0];
          created_at = created_at || "2024-08-09 16:36:00";
          firstName = firstName.toUpperCase();
          lastName = lastName.toUpperCase();
          // console.log(e.equipmentData.name);
          name ? (name = name) : (name = "unknown");
          // const { form_id } = e.data;
          const { formQuestions } = e;
          // console.log({ form_title });

          form_title = <h6>{form_title}</h6>;

          const questionArr = formQuestions.map((question, idx) => {
            if (
              question.answer !== null &&
              question.answer !== undefined &&
              question.answer !== ""
            ) {
              return (
                <div key={idx} className="form-grid-data">
                  <span className="font-small" style={{ width: "10px" }}>
                    {idx + 1}
                  </span>

                  <span className="font-mid " id="right-align">
                    {question.answer === true ? (
                      <YesIcon />
                    ) : question.answer === false ? (
                      <NoIcon />
                    ) : (
                      question.answer
                    )}
                  </span>
                  <span className="font-mid">{question.question}</span>
                </div>
              );
            }
          });

          created_at = moment(created_at).format("YYYY-MM-DD HH:mm:ss");
          tempArr.push({
            key: uuidv4(),
            form_title: form_title,
            opearator_name: `${firstName} ${lastName}`,
            equipment_name: name.toUpperCase(),
            form_type: form_type.toUpperCase(),
            created_at: created_at,
            description: questionArr,
          });
          return;
        });
      }

      setGridData(tempArr);
      setLoading(false); // Set loading to false after data is processed
    }
  }, [formData, userData]);

  const columns = [
    {
      title: "Title",
      dataIndex: "form_title",
      key: "form_title",
      sorter: (a, b) => a.form_title.length - b.form_title.length,
      sortOrder:
        sortedInfo.columnKey === "form_title" ? sortedInfo.order : null,
    },
    {
      title: "Operator Name",
      dataIndex: "opearator_name",
      key: "opearator_name",
    },
    {
      title: "Equipment Name",
      dataIndex: "equipment_name",
      key: "equipment_name",
    },

    {
      title: "Type",
      dataIndex: "form_type",
      key: "form_type",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
      sortOrder:
        sortedInfo.columnKey === "created_at" ? sortedInfo.order : null,
    },
    // {
    //   title: "Action",
    //   dataIndex: "",
    //   key: "x",
    //   render: () => <a>Delete</a>,
    // },
  ];

  return (
    <div>
      {loading ? (
        <p>Loading...</p> // Show loading message while data is being fetched
      ) : (
        <Table
          columns={columns}
          dataSource={gridData}
          onChange={handleTableChange}
          pagination={tableParams.pagination}
          size="small"
          expandable={{
            expandedRowRender: (record) => (
              <div
                style={{
                  margin: 0,
                }}
              >
                {record.description}
              </div>
            ),
            rowExpandable: (record) => record.name !== "Not Expandable",
          }}
        />
      )}
    </div>
  );
};
