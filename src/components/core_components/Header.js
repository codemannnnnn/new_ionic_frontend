import React, { useState } from "react";

// import { Divider, Button, Drawer } from "antd";
import { IonHeader, IonButton, IonIcon } from "@ionic/react";
import {
  personCircleOutline,
  settingsOutline,
  notificationsOutline,
  serverOutline,
} from "ionicons/icons";

import { useHistory } from "react-router-dom";
import white from "../../images/logo/white.png";
import { useStore } from "../../state/store";

export const Header = () => {
  const userData = useStore((state) => state.userInfo);

  const history = useHistory();
  const handleLogOut = (e) => {};
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  // console.log(userData);

  //version 2 of this app. see below html to remember what you were doing here. (dynamic drawer displays.)
  const handleClick = (e) => {
    var itemSelected = e.currentTarget.name;
    if (itemSelected === "settings") {
      history.push("/settings");
    }
    if (itemSelected === "profile") {
      history.push("/profile");
    }
    if (itemSelected === "notifications") {
      history.push("/notifications");
    }
    toggleDrawer();
  };

  return (
    <IonHeader>
      <div className="app-header">
        <img src={white} alt="logo" width={"140px"} />
        <div className="header-icon-group">
          {userData.role_id === 69 && (
            <div className="header-icon-ind">
              <IonButton onClick={(e) => history.push("admin")} fill="clear">
                <IonIcon
                  aria-hidden="true"
                  icon={serverOutline}
                  // size="large"
                  className="header-icon"
                />
              </IonButton>
            </div>
          )}
          <div className="header-icon-ind">
            <IonButton onClick={(e) => history.push("profile")} fill="clear">
              <IonIcon
                aria-hidden="true"
                icon={personCircleOutline}
                className="header-icon"
              />
            </IonButton>
          </div>

          <div className="header-icon-ind">
            <IonButton onClick={(e) => history.push("settings")} fill="clear">
              <IonIcon
                aria-hidden="true"
                icon={settingsOutline}
                className="header-icon"
              />
            </IonButton>
          </div>
          <div className="header-icon-ind">
            <IonButton
              onClick={(e) => history.push("notifications")}
              fill="clear"
            >
              <IonIcon
                aria-hidden="true"
                icon={notificationsOutline}
                className="header-icon"
              />
            </IonButton>
          </div>
        </div>
      </div>
    </IonHeader>
  );
};
