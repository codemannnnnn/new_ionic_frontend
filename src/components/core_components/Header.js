import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useUserUtils } from "../Utils/userUtils";
// import { useRecoilValue } from "recoil";
import { Divider, Button } from "antd";
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonContent,
  IonRouterOutlet,
} from "@ionic/react";
import { call, person, settings } from "ionicons/icons";

// import { userInfo } from "../../state/auth";

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
    <div>
      <div className="header-bar-container vertical-center">
        <h1>Header Bar</h1>

        <div className="homebar-menu vertical-center">
          {/* <div>
            {stateUserName.user == null
              ? ""
              : "Hi" +
                " " +
                stateUserName.user.charAt(0).toUpperCase() +
                stateUserName.user.slice(1)}
          </div> */}
          <Button className="" href={"/"}>
            Home Page
          </Button>
          <Button className="" href={"/dashboard"}>
            Dashboard
          </Button>

          <Button className="" href="/login">
            Login
          </Button>
          <Button className="" href="/signup">
            Sign Up
          </Button>
          <Button className="" href="/" onClick={handleLogOut}>
            Logout
          </Button>
        </div>
      </div>
      <Divider style={{ marginTop: "-2px" }} />
    </div>
  );
};
