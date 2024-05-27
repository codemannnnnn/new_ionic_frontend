import React from "react";

import { Divider, Button } from "antd";
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonContent,
  IonRouterOutlet,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { call, person, settings } from "ionicons/icons";

// import { Button } from "antd";
export const Header = () => {
  // const nav = useNavigate();
  //   const userActions = useUserUtils();
  //   const { logUserOut } = userActions;

  //   const stateUserName = useRecoilValue(userInfo);

  // const navigateUser = (e) => {
  //   console.log(e.target);
  //   nav(`/${e.target.value}`);
  // };

  const handleLogOut = (e) => {
    //route to signup page
    // logUserOut();
  };

  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>360 Inspection</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};
