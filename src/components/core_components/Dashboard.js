import { IonContent, IonPage } from "@ionic/react";
// import { call, person, settings } from "ionicons/icons";

import { useStore, useGrabUserInformation } from "../../state/store";

import { FormData } from "./FormData";
import { FormCards } from "./FormCards";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { message } from "antd";
import { use } from "react";
export const Dashboard = (render) => {
  const history = useHistory();
  const userData = useStore((state) => state.userInfo);
  // const equipmentss
  // console.log(userData);
  const fetchData = useGrabUserInformation();
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (userData !== undefined) {
      return;
    } else {
      history.push("/login");
      message.error("Please login.");
    }
  }, [userData, history]);

  return (
    <>
      <IonPage>
        <IonContent fullscreen>
          {userData && (
            <>
              {(userData.role_id === 1 && <FormCards />) ||
                (userData.role_id === 69 && <FormCards />)}
              <FormData />
            </>
          )}
        </IonContent>
      </IonPage>
    </>
  );
};
