import { IonContent, IonPage } from "@ionic/react";
// import { call, person, settings } from "ionicons/icons";

import { useStore } from "../../state/store";

import { FormData } from "./FormData";
import { FormCards } from "./FormCards";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

export const Dashboard = (render) => {
  const history = useHistory();
  const userData = useStore((state) => state.userInfo);
  // const equipmentss
  // console.log(userData);
  useEffect(() => {
    if (userData !== undefined) {
      return;
    } else {
      history.push("/login");
    }
  }, [userData, history]);

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
