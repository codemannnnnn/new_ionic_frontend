import { useState, useEffect } from "react";
import { Table, Card, Button, Modal, Form, Input, Select } from "antd";
import { createStyles } from "antd-style";
import { IonContent, IonPage, IonButton } from "@ionic/react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useStore, useGrabUserInformation } from "../../state/store";
import {
  postDataWithNoAuth,
  postNewEquipmentData,
} from "../../customHooks/useUserUtils";

import moment from "moment";
const cookie = require("cookie");

export const Admin = () => {
  const adminData = useStore((state) => state.adminData);
  const fetchData = useGrabUserInformation();
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <IonPage
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: "20px",
        }}
      >
        <IonContent fullscreen scrollY={true}>
          <div>
            <div>
              <AdminActions fetchData={fetchData} adminData={adminData} />
            </div>
            <div>
              <span className="admin-section-title">Users</span>
              <UsersPanel adminData={adminData} fetchData={fetchData} />
            </div>
            <div>
              <span className="admin-section-title">Forms</span>
              <FormsPanel adminData={adminData} fetchData={fetchData} />
            </div>
            <div>
              <span className="admin-section-title">QR Codes</span>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

const AdminActions = ({ fetchData, adminData }) => {
  const [listOfOrgs, setListOfOrgs] = useState([]);
  useEffect(() => {
    const setOrgToState = () => {
      const orgs = adminData.user.map((user) => ({
        key: uuidv4(),
        label: user.organization,
        value: user.organization_id,
      }));
      const uniqueOrgs = Array.from(
        new Map(orgs.map((org) => [org.value, org])).values()
      );
      setListOfOrgs(uniqueOrgs);
    };
    setOrgToState();
  }, [adminData]);

  const postAdminData = (body, type) => {
    const axiosPost = async (endpoint, body) => {
      const baseURL = process.env.REACT_APP_BASE_URL;

      const response = await axios.post(`${baseURL}/${endpoint}`, body);

      console.log(response);
    };
    if (type === "user") {
      const postBody = {
        firstName: body.firstName,
        lastName: body.lastName,
        username: body.email,
        password: body.password,
        temp_password: body.password,
        organization: body.organization,
        organization_id: body.organization_id,
        role_id: 2, // hardcoded for now (operators.)
        role: "Operator",
      };
      axiosPost("auth/register", postBody);
      fetchData();
    }
  };

  //create user section
  const [createUserOpen, setCreateUserOpen] = useState(false);
  const [createUserLoading, setCreateUserLoading] = useState(false);
  const [addOrg, setAddOrg] = useState(true);
  const [selectOrg, setSelectOrg] = useState(false);
  const [showCreateOrgButton, setShowCreateOrgButton] = useState(true);
  const [nextAvailableOrg, setNextAvailableOrg] = useState("");
  const [createUserForm] = Form.useForm();
  const handleCreateNewOrg = () => {
    const fetchNextOrgId = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users/latestOrganizationId`
        );
        const nextOrgId = response.data; // Adjust based on the API response structure
        setNextAvailableOrg(nextOrgId);
        console.log(nextOrgId);
      } catch (error) {
        console.error("Error fetching next organization ID:", error);
      }
    };
    fetchNextOrgId();
    console.log(nextAvailableOrg);
    createUserForm.setFieldsValue({
      organization_id: nextAvailableOrg,
    });
    setShowCreateOrgButton(false);
    setAddOrg(false);
    setSelectOrg(true);
  };
  const handleCreateUserOpen = () => {
    setCreateUserOpen(true);
  };

  const handleCreateUserOk = () => {
    const values = createUserForm.getFieldsValue();
    const organizationFinder = listOfOrgs.find(
      (org) => org.value === values.organization_select
    );
    const organization =
      organizationFinder && organizationFinder.label
        ? organizationFinder.label
        : values.organization;
    // console.log(organization.label);
    setCreateUserLoading(true);
    // console.log(values);
    // console.log(listOfOrgs);
    const postBody = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      organization: organization,
      organization_id:
        values.organization_select || Object.values(nextAvailableOrg)[0],
    };
    // console.log(postBody);
    postAdminData(postBody, "user");

    setCreateUserOpen(false);
    setCreateUserLoading(false);
    setAddOrg(true);
    setSelectOrg(false);
    setShowCreateOrgButton(true);

    createUserForm.resetFields();
  };
  const handleCreateUserCancel = () => {
    // console.log("Create User Cancel button clicked");
    setCreateUserOpen(false);
    setCreateUserLoading(false);
    setAddOrg(true);
    setSelectOrg(false);
    setShowCreateOrgButton(true);

    createUserForm.resetFields();
  };

  //create form section
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [createNewForm] = Form.useForm();
  const [questionArr, setQuestionArr] = useState(new Array(0).fill(1));
  const [initInputs, setInitInputs] = useState(1);

  const handleCreateFormOpen = () => {
    setCreateFormOpen(true);
  };
  const handleCreateFormOk = () => {
    // console.log("Create Form OK button clicked");
    setFormLoading(true);
    const values = createNewForm.getFieldsValue();
    const cookieUserID = cookie.parse(document.cookie).userID;
    const endpoint = "form/template";
    const formId = uuidv4();
    const dataToArr = Object.entries(values);
    const preppedData = [];
    // console.log(dataToArr);
    dataToArr.slice(3).forEach((e, idx) => {
      //   console.log(e);
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
      form_title: values.title,
      form_type: values.type,
      user_id: cookieUserID,
      questions: preppedData,
      organization_id: values.organization,
      form_template_id: uuidv4(),
      created_at: moment().toISOString(),
    });
    // console.log(formQuestionDataBlob);
    postDataWithNoAuth(endpoint, ...formQuestionDataBlob);
    fetchData();
    setCreateFormOpen(false);
    setFormLoading(false);
    createNewForm.resetFields();
  };
  const handleCreateFormCancel = () => {
    // console.log("Create Form Cancel button clicked");
    setCreateFormOpen(false);
    setFormLoading(false);
    createNewForm.resetFields();
  };

  const addOneToQuestionArray = () => {
    setQuestionArr(new Array(initInputs).fill(1));
    setInitInputs(initInputs + 1);
  };

  const resetNewForm = () => {
    setInitInputs(1);
    setQuestionArr(new Array(0).fill(1));
  };

  //create equipment section
  const [createNewEquipmentOpen, setCreateNewEquipmentOpen] = useState(false);
  const [equipmentLoading, setEquipmentLoading] = useState(false);
  const [createEquipment] = Form.useForm();

  const handleCreateNewEquipmentOpen = () => {
    setCreateNewEquipmentOpen(true);
  };
  const handleCreateEquipmentOk = () => {
    // console.log("Create Form OK button clicked");
    const vals = createEquipment.getFieldsValue();
    setEquipmentLoading(true);
    setCreateNewEquipmentOpen(false);

    const postData = {
      equipment_id: uuidv4(),
      name: vals.title,
      type: vals.type,
      organization_id: vals.organization,
      user_id: cookie.parse(document.cookie).userID,
    };
    postNewEquipmentData(postData);
    createEquipment.resetFields();
    setEquipmentLoading(false);
  };
  const handleCreateEquipmentCancel = () => {
    // console.log("Create Form Cancel button clicked");
    setCreateNewEquipmentOpen(false);
    setEquipmentLoading(false);
    createEquipment.resetFields();
  };

  //manage accounts section
  const [manageAccountOpen, setManageAccountOpen] = useState(false);
  const [manageAccountLoading, setManageAccountLoading] = useState(false);
  const handleManageAccountOpen = () => {
    setManageAccountOpen(true);
  };
  const handleManageAccountOk = () => {
    // console.log("Create Manage Account button clicked");
    setManageAccountLoading(true);
    setManageAccountOpen(false);
  };
  const handleManageAccountCancel = () => {
    // console.log("Create Manage Account Cancel button clicked");
    setManageAccountOpen(false);
    setManageAccountLoading(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "space-around",
          width: "70%",
          margin: "0 auto",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Button type="primary" onClick={handleCreateUserOpen}>
          Create New User
        </Button>
        <Button type="primary" onClick={handleCreateFormOpen}>
          Create New Form
        </Button>
        <Button type="primary" onClick={handleCreateNewEquipmentOpen}>
          Create New Equipment
        </Button>
        <Button type="primary" onClick={handleManageAccountOpen}>
          Manage Accounts
        </Button>
        <Modal
          title="Create New User"
          open={createUserOpen}
          onOk={handleCreateUserOk}
          confirmLoading={createUserLoading}
          onCancel={handleCreateUserCancel}
        >
          <Form
            form={createUserForm}
            style={{ width: "100%" }}
            layout="vertical"
            name="create_user_form"
          >
            <Form.Item
              name="firstName"
              //   label="First Name"
              rules={[
                { required: true, message: "Please enter the first name" },
              ]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item
              name="lastName"
              //   label="Last Name"
              rules={[
                { required: true, message: "Please enter the last name" },
              ]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
            <Form.Item
              name="email"
              //   label="Email"
              rules={[
                { required: true, message: "Please enter the email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              //   label="Organization"
              rules={[{ required: true, message: "Please enter a password" }]}
            >
              <Input placeholder="Password" />
            </Form.Item>

            <Form.Item name="organization_select" hidden={selectOrg}>
              <Select
                placeholder="Select Organization"
                options={listOfOrgs}
                onSelect={() => {
                  setShowCreateOrgButton(false);
                }}
              />
            </Form.Item>

            <Form.Item
              name="organization"
              hidden={addOrg}
              rules={[
                {
                  required: true,
                  message: "Please enter an organization name.",
                },
              ]}
            >
              <Input placeholder="Organization Name" />
            </Form.Item>
            {showCreateOrgButton && (
              <Button onClick={handleCreateNewOrg}>
                Create New Organization
              </Button>
            )}
          </Form>
        </Modal>
        <Modal
          title="Create New Form"
          open={createFormOpen}
          onOk={handleCreateFormOk}
          confirmLoading={formLoading}
          onCancel={handleCreateFormCancel}
        >
          <Form form={createNewForm} layout="vertical" name="form_in_modal">
            <Form.Item name="organization">
              <Select placeholder="Select Organization" options={listOfOrgs} />
            </Form.Item>
            <Form.Item
              style={{ marginTop: "20px" }}
              name="title"
              //   label="Title"
              rules={[
                {
                  required: true,
                  message: "Please input the title of collection of questions!",
                },
              ]}
            >
              <Input name="form_title" placeholder="Title" />
            </Form.Item>

            <Form.Item name="type">
              <Select placeholder="Select Type">
                <Select.Option value="forklift">Forklift</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="question-1">
              <Input type="textarea" placeholder="Question 1" />
            </Form.Item>
            {questionArr.map((e, idx) => {
              return (
                <Form.Item
                  key={idx}
                  name={`question-${idx + 2}`}
                  //   label="Question"
                >
                  <Input type="textarea" placeholder={`Question ${idx + 2}`} />
                </Form.Item>
              );
            })}
            <Form.Item>
              <Button type="primary" onClick={addOneToQuestionArray}>
                Add More
              </Button>
              <Button style={{ marginLeft: "8px" }} onClick={resetNewForm}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Create New Equipment"
          open={createNewEquipmentOpen}
          onOk={handleCreateEquipmentOk}
          confirmLoading={equipmentLoading}
          onCancel={handleCreateEquipmentCancel}
        >
          <Form form={createEquipment} layout="vertical" name="form_in_modal">
            <Form.Item name="organization">
              <Select placeholder="Select Organization" options={listOfOrgs} />
            </Form.Item>

            <Form.Item name="type">
              <Select placeholder="Select Type">
                <Select.Option value="forklift">Forklift</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              style={{ marginTop: "20px" }}
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please input the title of your new equipment.",
                },
              ]}
            >
              <Input name="equipment_title" placeholder="Equipment Title" />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Manage Accounts"
          open={manageAccountOpen}
          onOk={handleManageAccountOk}
          confirmLoading={manageAccountLoading}
          onCancel={handleManageAccountCancel}
        ></Modal>
      </div>
    </>
  );
};

const UsersPanel = ({ adminData, fetchData }) => {
  const [allUsers, setAllUsers] = useState([]);
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
  const handleTableChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
    setTableParams({
      pagination,
    });
  };
  useEffect(() => {
    setAllUsers(
      adminData.user.map((user) => ({
        key: uuidv4(),
        name: `${
          user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)
        } ${user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}`,
        organization: user.organization,
        organization_id: user.organization_id,
        role: user.role,
        role_id: user.role_id,
        username: user.email,
        temp_password: user.temp_password,
        created_at: moment(user.created_at).format("MM-DD-YYYY"),
      }))
    );
  }, [adminData]);

  const columns = [
    {
      //   key: "",
      title: "Name",
      dataIndex: "name",
      width: 75,
      //   editable: true,
    },
    {
      title: "Organization",
      dataIndex: "organization",
      width: 100,
    },
    {
      title: "Organization ID",
      dataIndex: "organization_id",
      width: 50,
    },
    {
      title: "Username",
      dataIndex: "username",
      width: 75,
    },
    {
      title: "Temp Password",
      dataIndex: "temp_password",
      width: 75,
    },
    {
      title: "Role",
      dataIndex: "role",
      width: 50,
    },
    {
      title: "Role ID",
      dataIndex: "role_id",
      width: 50,
    },
    {
      title: "Date Created",
      dataIndex: "created_at",
      width: 50,
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
      sortOrder:
        sortedInfo.columnKey === "created_at" ? sortedInfo.order : null,
    },
  ];

  const handleEdit = (record, field) => {
    console.log(`Editing ${field} for`, record);
    // Add your logic to handle editing here
  };

  return (
    <>
      <Table
        onChange={handleTableChange}
        columns={columns}
        dataSource={allUsers}
        pagination={tableParams.pagination}
        scroll={{ y: 55 * 5 }}
        size="small"
      />
    </>
  );
};

const FormsPanel = ({ adminData, fetchData }) => {
  const [allForms, setAllForms] = useState([]);
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
  const handleTableChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
    setTableParams({
      pagination,
    });
  };
  useEffect(() => {
    setAllForms(
      adminData.form.map((form) => ({
        key: uuidv4(),
        form_name: form.data.form_title,
        form_id: form.data.form_id,
        form_type: form.data.form_type,
        organization: form.data.organization_id,
        organization_id: form.data.organization_id,
        created_at: moment(form.data.created_at).format("MM-DD-YYYY"),
      }))
    );
  }, [adminData]);

  const columns = [
    {
      //   key: "",
      title: "Form Name",
      dataIndex: "form_name",
      width: 75,
      //   editable: true,
    },
    {
      //   key: "",
      title: "Form Type",
      dataIndex: "form_type",
      width: 75,
      //   editable: true,
    },
    {
      //   key: "",
      title: "Form ID",
      dataIndex: "form_id",
      width: 75,
      render: (text) => <span style={{ fontSize: "12px" }}>{text}</span>,
      //   editable: true,
    },
    {
      title: "Organization",
      dataIndex: "organization",
      width: 100,
      render: (text) => {
        const matchedUser = adminData.user.find(
          (user) => user.organization_id === text
        );
        return matchedUser ? matchedUser.organization : "Unknown";
      },
    },
    {
      title: "Organization ID",
      dataIndex: "organization_id",
      width: 50,
    },
    {
      title: "Date Created",
      dataIndex: "created_at",
      width: 50,
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
      sortOrder:
        sortedInfo.columnKey === "created_at" ? sortedInfo.order : null,
    },
    // {
    //   title: "Edit",
    //   key: "edit",
    //   fixed: "right",
    //   width: 50,
    //   render: (_, record) => (
    //     <a
    //       onClick={() => {
    //         const updatedName = prompt("Edit Name:", record.name);
    //         const updatedOrganization = prompt(
    //           "Edit Organization:",
    //           record.organization
    //         );
    //         const updatedOrganizationId = prompt(
    //           "Edit Organization ID:",
    //           record.organization_id
    //         );

    //         if (
    //           updatedName !== null &&
    //           updatedOrganization !== null &&
    //           updatedOrganizationId !== null
    //         ) {
    //           const updatedRecord = {
    //             ...record,
    //             name: updatedName,
    //             organization: updatedOrganization,
    //             organization_id: updatedOrganizationId,
    //           };

    //           setallForms((prevUsers) =>
    //             prevUsers.map((user) =>
    //               user.key === record.key ? updatedRecord : user
    //             )
    //           );

    //           // Add your logic to save the updated record to the database here
    //           console.log("Updated record:", updatedRecord);
    //         }
    //       }}
    //     >
    //       Edit
    //     </a>
    //   ),
    // },
  ];

  const handleEdit = (record, field) => {
    console.log(`Editing ${field} for`, record);
    // Add your logic to handle editing here
  };

  return (
    <>
      <Table
        onChange={handleTableChange}
        columns={columns}
        dataSource={allForms}
        pagination={tableParams.pagination}
        scroll={{ y: 55 * 5 }}
        size="small"
      />
    </>
  );
};
