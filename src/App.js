// import logo from "./logo.svg";
import "./App.css";
import "@ionic/react/css/core.css";

// import { useStore, useGrabUserInformation } from "./state/store";

import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  IonContent,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
// import cookie from "js-cookie";

import { logInOutline, clipboardOutline, appsOutline } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
/* Basic CSS for apps built with Ionic */
// import "./theme/variables.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

//components
import { Header } from "./components/core_components/Header";
// import { Home } from "./components/core_components/Home";
import { Dashboard } from "./components/core_components/Dashboard";
import { Login } from "./components/core_components/Login";
// import { Signup } from "./components/core_components/Signup";
import { Forms } from "./components/core_components/Forms";
// import { DarkModeToggle } from "./customHooks/DarkModeToggle";

import { useStore, useGrabUserInformation } from "./state/store";
import { Profile } from "./components/core_components/Profile";
import { Settings } from "./components/core_components/Settings";
import { Notifications } from "./components/core_components/Notifications";
import ErrorBoundary from "./components/error handling/ErrorBoundary";
import ErrorPage from "./components/error handling/ErrorPage";
// import { useEffect } from "react";
// import { useStore } from "zustand";
import { Route, Switch, useHistory } from "react-router-dom";
// import { PrivateRoute } from "./components/auth_components/PrivateRoute";

// const cookie = require("cookie");

setupIonicReact();

function App() {
  //pull your user information in.
  // const userInfo = useStore((state) => state.userInfo);
  // // console.log({ userInfo });
  // const history = useHistory();
  // const userIDfromCookie = cookie.parse(document.cookie).userID;
  // useGrabUserInformation();
  // const getData = useGrabUserInformation();
  // console.log({ userIDfromCookie });
  // useEffect(() => {
  //   if (userIDfromCookie) {
  //     getData();
  //   } else {
  //     history.push("/login");
  //   }
  // }, [userIDfromCookie, getData, history]);
  return (
    <IonApp className="App">
      <IonReactRouter>
        <ErrorBoundary>
          <Header />
          <IonContent>
            <IonTabs>
              <IonRouterOutlet>
                <Switch>
                  <Route path="/error" component={ErrorPage} />
                  <Route exact path="/dashboard">
                    <Dashboard />
                  </Route>
                  <Route exact path="/forms">
                    <Forms />
                  </Route>
                  <Route exact path="/login">
                    <Login />
                  </Route>

                  <Route exact path="/profile">
                    <Profile />
                  </Route>
                  <Route exact path="/settings">
                    <Settings />
                  </Route>
                  <Route exact path="/notifications">
                    <Notifications />
                  </Route>
                  <Route path="*" component={ErrorPage} />
                </Switch>
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="dashboard" href="/dashboard">
                  <IonIcon aria-hidden="true" icon={appsOutline} />
                  <IonLabel>Dashboard</IonLabel>
                </IonTabButton>
                <IonTabButton tab="forms" href="/forms">
                  <IonIcon aria-hidden="true" icon={clipboardOutline} />
                  <IonLabel>Forms</IonLabel>
                </IonTabButton>
                <IonTabButton tab="login" href="/login">
                  <IonIcon aria-hidden="true" icon={logInOutline} />
                  <IonLabel>Login</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </IonContent>
        </ErrorBoundary>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
