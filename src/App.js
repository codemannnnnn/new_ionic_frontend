// import logo from "./logo.svg";
import "./App.css";
import { Redirect, Route } from "react-router-dom";

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
  IonHeader,
  IonToolbar,
  IonText,
  IonPage,
  IonContent,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
// import cookie from "js-cookie";

import {
  images,
  ellipse,
  square,
  triangle,
  homeOutline,
  bookmarkOutline,
  trailSignOutline,
  logInOutline,
  logOutOutline,
} from "ionicons/icons";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
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
import { Home } from "./components/core_components/Home";
import { Dashboard } from "./components/core_components/Dashboard";
import { Login } from "./components/core_components/Login";
import { Signup } from "./components/core_components/Signup";
import { Forms } from "./components/core_components/Forms";
import { DarkModeToggle } from "./customHooks/DarkModeToggle";

import { useGrabUserInformation } from "./state/store";

setupIonicReact();

function App() {
  //pull your user information in.
  useGrabUserInformation();
  return (
    <IonApp className="App">
      <Header />
      <IonContent>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/dashboard">
                <Dashboard />
              </Route>
              <Route exact path="/forms">
                <Forms />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="" href="/home">
                <IonIcon aria-hidden="true" icon={bookmarkOutline} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>
              <IonTabButton tab="dashboard" href="/dashboard">
                <IonIcon aria-hidden="true" icon={bookmarkOutline} />
                <IonLabel>Dashboard</IonLabel>
              </IonTabButton>
              <IonTabButton tab="forms" href="/forms">
                <IonIcon aria-hidden="true" icon={homeOutline} />
                <IonLabel>Forms</IonLabel>
              </IonTabButton>
              <IonTabButton tab="login" href="/login">
                <IonIcon aria-hidden="true" icon={logInOutline} />
                <IonLabel>Login</IonLabel>
              </IonTabButton>
              <IonTabButton tab="signuIonText" href="/signup">
                <IonIcon aria-hidden="true" icon={trailSignOutline} />
                <IonLabel>Signup</IonLabel>
              </IonTabButton>
              <IonTabButton tab="logout" href="/logout">
                <IonIcon aria-hidden="true" icon={logOutOutline} />
                <IonLabel>Logout</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonContent>
    </IonApp>
  );
}

export default App;
