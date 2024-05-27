import { Divider } from "antd";

import { EquipmentGrid } from "../form_components/EquipmentGrid";
import { InspectionForm } from "../form_components/InspectionForm";
import { InspectionModal } from "../form_components/InspectionModal";
import { FormsGrid } from "../form_components/FormsGrid";

//import ionic stuff
import {
  IonCard,
  IonContent,
  IonTitle,
  IonModal,
  IonButton,
  IonRow,
  IonCol,
  IonCardSubtitle,
  IonCardTitle,
  IonPage,
  IonRoute,
  IonToggle,
  IonRadioGroup,
  IonItem,
  IonLabel,
  IonRadio,
  IonToolbar,
  IonButtons,
  IonIcon,
} from "@ionic/react";

import { Button, Modal } from "antd";

import { useStore, useGrabUserInformation } from "../../state/store";
import { useEffect, useState } from "react";
export const Forms = () => {
  const formData = useStore((state) => state.formInfo);
  const [selectedForm, setSelectedForm] = useState(0);

  //ant design modal
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = (event) => {
    const currentFormSelected =
      event.currentTarget.getAttribute("data-value-form");
    setSelectedForm(currentFormSelected);
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
    resetQuestions();
  };

  const resetQuestions = () => {
    const elements = Array.from(document.querySelectorAll("[aria-checked]"));
    elements
      .filter((element) => element.getAttribute("aria-checked") === "true")
      .forEach((element) => element.setAttribute("aria-checked", "false"));
  };
  return (
    <>
      <IonPage>
        <IonContent fullscreen>
          <div className="margin-5">
            <InspectionModal />
          </div>
          {formData.map((e, idx) => {
            const { title } = e.data;
            const { form_id } = e.data;
            const { form_type } = e.data;
            const { formQuestions } = e;
            return (
              <IonCard className="card-padding-small left-align" key={idx}>
                <IonCardTitle>{title}</IonCardTitle>
                <IonCardSubtitle>Form Type {form_type}</IonCardSubtitle>
                <Button
                  data-value-form={idx}
                  type="primary"
                  onClick={showModal}
                >
                  Open
                </Button>
                <Modal
                  title={formData[selectedForm].data.title}
                  open={open}
                  onOk={handleOk}
                  confirmLoading={confirmLoading}
                  onCancel={handleCancel}
                >
                  {/* Set up the form to display the quesdions and booleans for the form. Add button to save work. */}
                  {formData[selectedForm].formQuestions.map((j, index) => {
                    const { question } = j;
                    return (
                      <div className="split-two" key={index}>
                        <div>
                          <IonLabel>{question}</IonLabel>
                        </div>
                        <div>
                          <IonRadioGroup className="split-radio ">
                            <IonItem lines="none">
                              <IonLabel>Yes</IonLabel>
                              <IonRadio
                                aria-label="Custom checkbox"
                                slot="end"
                                value="yes"
                              />
                            </IonItem>
                            <IonItem lines="none">
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
                  })}
                </Modal>
              </IonCard>
            );
          })}
        </IonContent>
      </IonPage>
    </>
  );
};
