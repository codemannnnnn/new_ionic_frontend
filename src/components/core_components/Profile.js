import React from "react";

import { logOutOutline } from "ionicons/icons";
import {
  IonButton,
  IonContent,
  IonIcon,
  IonLabel,
  IonPage,
} from "@ionic/react";
import { Card, Input } from "antd";
import { useStore, useLogoutUser } from "../../state/store";
import { useHistory } from "react-router-dom";

export const Profile = () => {
  const history = useHistory();
  const logoutUser = useLogoutUser();
  const userData = useStore((state) => state.userInfo);
  // console.log(userData);
  const handleLogout = () => {
    logoutUser();
    history.push("/login");
  };
  return (
    <>
      <IonPage>
        <div className="split-twoss">
          <Card
            title="Profile"
            bordered={false}
            style={{
              textAlign: "left",
            }}
          >
            {/* <div> */}
            <p>
              Username: {userData.username != null ? userData.username : "NA"}
            </p>
            <p>
              Name:{" "}
              {userData.firstName != null
                ? userData.firstName + " " + userData.lastName
                : "NA"}
            </p>
            <p>Title: {userData.title != null ? userData.title : "NA"}</p>
            <p>
              Organization ID:{" "}
              {userData.organization_id != null
                ? userData.organization_id
                : "NA"}
            </p>
            <p>
              Created:{" "}
              {userData.created_at != null ? userData.created_at : "NA"}
            </p>
            {/* </div> */}
            {/* <span>
                  <Input placeholder="Basic usage" />
                </span> */}

            <IonButton color="primary" onClick={handleLogout}>
              <IonIcon slot="start" icon={logOutOutline} />
              Logout
            </IonButton>
          </Card>

          {/* <div>
            <IonButton color="primary" onClick={handleLogout}>
              <IonIcon slot="start" icon={logOutOutline} />
              Logout
            </IonButton>
          </div> */}
        </div>
      </IonPage>
    </>
  );
};
