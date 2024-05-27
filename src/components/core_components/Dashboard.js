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
} from "@ionic/react";
import { call, person, settings } from "ionicons/icons";

import { useStore, useGrabUserInformation } from "../../state/store";

// console.log(useStore);
export const Dashboard = () => {
  const userData = useStore((state) => state.userInfo);

  // firstName = firstName.toUpperCase() + firstName.slice(1);

  return (
    <>
      <IonPage>
        <IonContent fullscreen>
          <div className="two-card">
            <IonCard className="card-padding-mid">
              <IonCardTitle>
                Hello,{" "}
                <span>
                  {userData.firstName != undefined
                    ? userData.firstName.charAt(0).toUpperCase() +
                      userData.firstName.slice(1) +
                      "."
                    : null}
                </span>
              </IonCardTitle>
            </IonCard>
          </div>
          <div className="two-card small-card left-align">
            <IonCard className="card-padding-mid">
              <IonCardTitle>
                <div>Username {userData.username}</div>
                <div>
                  Member since{" "}
                  {new Date(userData.created_at).toLocaleDateString()}
                </div>
                <div>Organization ID {userData.organization_id}</div>
              </IonCardTitle>
            </IonCard>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};
