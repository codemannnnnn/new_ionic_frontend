import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonCardHeader,
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { call, person, settings } from "ionicons/icons";

import { useStore, useGrabUserInformation } from "../../state/store";

import { FormData } from "./FormData";
import { FormCards } from "./FormCards";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

export const Dashboard = (render) => {
  const history = useHistory();
  const userData = useStore((state) => state.userInfo);
  // console.log(userData);
  useEffect(() => {
    if (userData !== undefined) {
      return;
    } else {
      history.push("/login");
    }
  }, [userData]);

  return (
    <>
      <IonPage>
        <IonContent fullscreen>
          {userData && (
            <>
              {userData.role_id === 1 && <FormCards />}
              <FormData />
            </>
          )}
        </IonContent>
      </IonPage>
    </>
  );
};
