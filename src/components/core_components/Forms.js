import moment from "moment";
import { v4 as uuidv4 } from "uuid";
//import ionic stuff
import {
  IonCard,
  IonContent,
  IonCardTitle,
  IonPage,
  IonRadioGroup,
  IonItem,
  IonLabel,
  IonRadio,
} from "@ionic/react";

import axios from "axios";

import { Button, Modal, Select, Input } from "antd";

import { useStore, useGrabUserInformation } from "../../state/store";
import { postFormData } from "../../customHooks/useUserUtils";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const cookie = require("cookie");
export const Forms = () => {
  const history = useHistory();
  const userData = useStore((state) => state.userInfo);
  // console.log(userData);
  useEffect(() => {
    if (userData !== undefined) {
      return;
    } else {
      history.push("/login");
    }
  }, [userData, history]);
  const grabData = useGrabUserInformation();

  const formData = useStore((state) => state.formInfo);
  const equipment = useStore((state) => state.equipment);
  const [toggleNoData, setToggleNoData] = useState(false);
  // console.log(equipment);
  // console.log(formData);
  // if (formData === undefined || formData === null || formData.length === 0) {
  //   console.log("no form data");
  // }

  const [stateEquipment, setStateEquipment] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [selectedEquipmentID, setSelectedEquipmentID] = useState("");
  const [selectValidation, setSelectValidation] = useState("error");
  const [loading, setLoading] = useState(true); // Add loading state
  const [hours, setHours] = useState("");
  const [notes, setNotes] = useState("");

  const [selectedForm, setSelectedForm] = useState(0);
  const [questionAnswers, setQuestionAnswers] = useState([]);

  //ant design modal
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const cookieUserID = cookie.parse(document.cookie).userID;

  // console.log("calling a refresh...");
  // useGrabUserInformation();

  const showModal = (event) => {
    const currentFormSelected =
      event.currentTarget.getAttribute("data-value-form");
    // console.log(currentFormSelected);
    setSelectedForm(currentFormSelected);
    setOpen(true);
  };
  // console.log(questionAnswers);

  const handleOk = () => {
    const questionArr = [];
    // console.log(formData);
    var formTitle;
    var formType;
    var userID;
    var orgID;
    var formTemplateID;

    formData.forEach((e, idx) => {
      if (e.data.form_id === selectedForm) {
        formTitle = e.data.form_title;
        formType = e.data.form_type;
        userID = e.data.user_id;
        orgID = e.data.organization_id;
        formTemplateID = e.data.form_template_id;
        // console.log(e);
        const { formQuestions } = e;
        // console.log({ formQuestions });
        // console.log({ questionAnswers });
        formQuestions.forEach((fq) => {
          const answer = questionAnswers.find(
            (q) => q.question_id === fq.question_id
          );
          // console.log(answer);
          if (answer) {
            questionArr.push({
              question: fq.question,
              question_id: uuidv4(),
              answer: answer.answer === "yes" ? true : false,
              answer_id: uuidv4(),
            });
          }
        });
      }
    });
    const postData = {
      form_id: uuidv4(),
      form_title: formTitle,
      form_type: formType,
      user_id: cookieUserID,
      organization_id: orgID,
      form_template_id: formTemplateID,
      created_at: moment().toISOString(),
      questions: questionArr,
      equipment_id: selectedEquipmentID,
      hours: hours,
      form_note: notes,
      // formData[selectedForm].formQuestions.question,
    };
    // console.log(postData);
    setConfirmLoading(true);
    postFormData(postData);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      resetQuestions();
      //bring in the newly created form into your dashboard
      refreshDashboard();
    }, 2000);
    validateSelectInput();
  };
  var setFormInfo = useStore((e) => e.setFormInfo);
  var setQuestions = useStore((e) => e.setQuestions);
  const refreshDashboard = () => {
    const userIDfromCookie = cookie.parse(document.cookie).userID;

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/user_data/${userIDfromCookie}`)
      .then((res) => {
        // console.log(res.data.equipment, "cody");
        // setEquipment(res.data.equipment);
        // setUserInfo(res.data.user);
        setFormInfo(res.data.form);
        setQuestions(res.data.form[0].formQuestions);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    setOpen(false);
    resetQuestions();
  };

  const resetQuestions = () => {
    const elements = Array.from(document.querySelectorAll("[aria-checked]"));
    elements
      .filter((element) => element.getAttribute("aria-checked") === "true")
      .forEach((element) => element.click());
  };

  useEffect(() => {
    var count = 1;
    var tempEquipmentArr = [];

    //list values for Please choose an option

    if (equipment) {
      equipment.forEach((e) => {
        var value = e.name;
        var label = e.name;
        label = <p id="form_select_validation">{label}</p>;
        tempEquipmentArr.push({
          value: `${value}${count}`,
          label: label,
        });
        count++;
      });
      setLoading(false); // Set loading to false after data is processed
    }

    setStateEquipment(tempEquipmentArr);
    // equipment.forEach((e) => {
  }, [equipment]);

  const setEquipmentIDToState = (e) => {
    equipment.forEach((e) => {
      console.log(e);
    });
  };
  useEffect(() => {
    // console.log(selectedEquipment);
    if (equipment) {
      equipment.forEach((e) => {
        if (e.name === selectedEquipment.replace(/[0-9]/g, "")) {
          setSelectedEquipmentID(e.equipment_id);
          setLoading(false); // Set loading to false after data is processed
        }
      });
    }
  }, [selectedEquipment]);

  const [selectedValue, setSelectedValue] = useState("Please choose an option");

  const handleInputChanges = (e) => {
    setSelectedEquipment(e);
    setSelectedValue(e);
    validateSelectInput();
  };

  // useEffect(() => {
  //   // Function to check if the click is outside the modal
  //   const handleClickOutside = (event) => {
  //     const modal = document.getElementById("forms_modal_1");
  //     if (modal && !modal.contains(event.target)) {
  //       setSelectedValue("Please choose an option"); // Reset the select input
  //     }
  //   };

  //   // Add event listener when the component mounts or the modal is opened
  //   document.addEventListener("mousedown", handleClickOutside);

  //   // Remove event listener on cleanup
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []); // You might need to adjust the dependency array based on when you want this effect to run

  const validateSelectInput = () => {
    try {
      const inputBox = document.getElementById("form_select_validation");
      if (inputBox.textContent == null || inputBox.textContent === "") {
        // console.log("Please choose an option");
      } else {
        // console.log("You have selected an option");
        setSelectValidation("none");
      }
    } catch (err) {
      // console.log(err.message);
      setSelectValidation("error");
    }
  };
  // console.log(selectedEquipmentID);

  return (
    <>
      <IonPage>
        <IonContent fullscreen>
          {/* /* {console.log({ formData })} */}
          {formData && formData.length > 0 ? (
            formData
              .reduce((uniqueForms, form) => {
                const existingForm = uniqueForms.find(
                  (f) => f.data.form_template_id === form.data.form_template_id
                );
                if (!existingForm) {
                  uniqueForms.push(form);
                }
                return uniqueForms;
              }, [])
              .map((e, idx) => {
                // console.log(e);
                const { form_title } = e.data;
                const { form_id } = e.data;
                const { form_type } = e.data;
                const { formQuestions } = e;
                return (
                  <IonCard className="card-padding-small left-align" key={idx}>
                    <IonCardTitle>{form_title}</IonCardTitle>
                    {/* <IonCardSubtitle>{form_type}</IonCardSubtitle> */}
                    <Button
                      data-value-form={e.data.form_id}
                      // data-value-form={idx}
                      type="primary"
                      onClick={showModal}
                    >
                      Open
                    </Button>
                    <span id="forms_modal_1">
                      {/* {console.log(formData)} */}
                      {/* {console.log(e)} */}
                      <Modal
                        // title={formData[selectedForm].data.title}
                        title={formData.map((k) => {
                          if (k.data.form_id === selectedForm) {
                            // console.log(k.data.form_title);
                            return k.data.form_title;
                            // return "lkjlj";
                          }
                        })}
                        open={open}
                        onOk={handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}
                      >
                        <Select
                          value={selectedValue} // Bind the select value to your state
                          status={selectValidation}
                          style={{
                            width: 240,
                          }}
                          onChange={handleInputChanges}
                          options={stateEquipment}
                        />
                        {/* <div className="split-two"> */}
                        {/* <span>Hours</span> */}
                        <div style={{ marginTop: "3%", marginBottom: "3%" }}>
                          <Input
                            onChange={(e) => setHours(e.target.value)}
                            placeholder="Hours"
                            style={{ width: "20%" }}
                          />
                        </div>
                        {/* </div> */}
                        {/* Set up the form to display the quesdions and booleans for the form. Add button to save work. */}
                        {/* {formData[selectedForm].formQuestions.map((j, index) => { */}
                        {formData.map((j, index) => {
                          if (j.data.form_id === selectedForm) {
                            // console.log(j);

                            const { formQuestions } = j;
                            return formQuestions.map((l, index) => {
                              const { question } = l;
                              // console.log({ question });

                              return (
                                <div className="split-two" key={index}>
                                  <div>
                                    <IonLabel>{question}</IonLabel>
                                  </div>
                                  <div>
                                    <IonRadioGroup
                                      className="split-radio"
                                      allowEmptySelection={true}
                                      onIonChange={(answer) => {
                                        var questionAnswerData = [
                                          ...questionAnswers,
                                        ]; // Copy the existing state
                                        const answerIndex =
                                          questionAnswerData.findIndex(
                                            (q) =>
                                              q.question_id === l.question_id
                                          );

                                        if (answerIndex >= 0) {
                                          // Update the answer if the question already exists
                                          questionAnswerData[
                                            answerIndex
                                          ].answer = answer.detail.value;
                                        } else {
                                          // Add a new answer if the question does not exist
                                          questionAnswerData.push({
                                            question_id: l.question_id,
                                            answer: answer.detail.value,
                                          });
                                        }

                                        setQuestionAnswers(questionAnswerData);
                                      }}
                                    >
                                      <IonItem lines="none">
                                        <IonLabel>Yes</IonLabel>
                                        <IonRadio
                                          aria-label="Custom checkbox"
                                          slot="end"
                                          value="yes"
                                        />
                                      </IonItem>
                                      <IonItem
                                        lines="none"
                                        // id={j.question_id}
                                        // onClick={(e) => console.log(e, "no clicked")}
                                      >
                                        <IonLabel>No</IonLabel>
                                        <IonRadio
                                          aria-label="Custom checkbox"
                                          slot="end"
                                          value="no"
                                        />
                                      </IonItem>
                                    </IonRadioGroup>
                                  </div>
                                </div>
                              );
                            });
                          }
                        })}
                        <div style={{ marginTop: "3%", marginBottom: "3%" }}>
                          {/* <div>Notes</div> */}
                          <Input
                            placeholder="Notes"
                            onChange={(e) => setNotes(e.target.value)}
                            style={{ width: "100%" }}
                          />
                        </div>
                      </Modal>
                    </span>
                  </IonCard>
                );
              })
          ) : (
            <p>No forms created yet, please contact your admin.</p> // Show loading message while data is being fetched
            // toggleNoData && <p>No data available</p>}
          )}
        </IonContent>
      </IonPage>
    </>
  );
};
