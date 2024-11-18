import React, { useState } from "react";

// import { Divider, Button, Drawer } from "antd";
import { IonHeader, IonButton, IonIcon } from "@ionic/react";
import {
  personCircleOutline,
  settingsOutline,
  notificationsOutline,
} from "ionicons/icons";

// import { Settings } from "./Settings";
// import { Notifications } from "./Notifications";
// import { Profile } from "./Profile";
import { useHistory } from "react-router-dom";
import white from "../../images/logo/white.png";
// import { Redirect, Route } from "react-router-dom";
// import { IonReactRouter } from "@ionic/react-router";

// import { Button } from "antd";
export const Header = () => {
  const history = useHistory();
  const handleLogOut = (e) => {
    //route to signup page
    // logUserOut();
  };
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

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
          <span>
            <IonButton onClick={(e) => history.push("profile")} fill="clear">
              <IonIcon
                className="header-icons"
                aria-hidden="true"
                icon={personCircleOutline}
              />
            </IonButton>
          </span>

          <span>
            <IonButton onClick={(e) => history.push("settings")} fill="clear">
              <IonIcon
                className="header-icons"
                aria-hidden="true"
                icon={settingsOutline}
              />
            </IonButton>
          </span>
          <span>
            <IonButton
              onClick={(e) => history.push("notifications")}
              fill="clear"
            >
              <IonIcon
                className="header-icons"
                aria-hidden="true"
                icon={notificationsOutline}
              />
            </IonButton>
          </span>

          {/* 
          version 2 of this app.
          <span>
            <IonButton onClick={toggleDrawer} fill="clear">
              <IonIcon
                className="header-icons"
                aria-hidden="true"
                icon={personCircleOutline}
              />
            </IonButton>
          </span>

          <span>
            <IonButton onClick={toggleDrawer} fill="clear">
              <IonIcon
                className="header-icons"
                aria-hidden="true"
                icon={settingsOutline}
              />
            </IonButton>
          </span>
          <span>
            <IonButton onClick={toggleDrawer} fill="clear">
              <IonIcon
                className="header-icons"
                aria-hidden="true"
                icon={notificationsOutline}
              />
            </IonButton>
          </span>

          <Drawer
            title="Menu"
            placement="right"
            closable={false}
            onClose={toggleDrawer}
            open={showDrawer}
          >
            <p>
              <Button type="link" name="profile" onClick={handleClick}>
                Profile
              </Button>
            </p>
            <p>
              <Button type="link" name="settings" onClick={handleClick}>
                Settings
              </Button>
            </p>
            <p>
              <Button type="link" name="notifications" onClick={handleClick}>
                Notifications
              </Button>
            </p>
          </Drawer> */}
        </div>
      </div>
    </IonHeader>
  );
};
