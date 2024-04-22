import logo from "./logo.svg";
import "./App.css";
import "@ionic/react/css/core.css";
import { React, Suspense, useEffect, useState } from "react";

import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import cookie from "js-cookie";

import { images, square, triangle } from "ionicons/icons";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
/* Theme variables */
import "./theme/variables.css";

//handle auth
import { useAuthenticator } from "./customHooks/useAuthenticator";

//components
import { Header } from "./components/core_components/Header";
import { Home } from "./components/core_components/Home";
import { Login } from "./components/core_components/Login";
import { Signup } from "./components/core_components/Signup";
import { Dashboard } from "./components/core_components/Dashboard";

//react router
import { Routes, Route, useNavigate, Redirect } from "react-router-dom";

import { useRecoilState, useRecoilValue } from "recoil";
import { atomIsUserLoggedIn } from "./state/auth";

setupIonicReact();

function App() {
  // const nav = useNavigate();

  const { checkIfUserIsLoggedIn } = useAuthenticator();

  //local state
  const [userTryingToLogin, setUserTryingToLogin] = useState(false);

  //global state
  const [userData, setUserData] = useRecoilState(atomIsUserLoggedIn);

  useEffect(() => {
    // console.log(userData);
    // if (userData === false) {
    checkIfUserIsLoggedIn();
    // console.log(userData);
    // }
  }, []);

  // console.log({ userData });

  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <IonApp>
          {/* <Header /> */}
          <IonReactRouter>
            <IonRouterOutlet>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/dashboard">
                <Dashboard />
              </Route>
              <Route exact path="/header">
                <Header />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/">
                <Redirect to="/" />
              </Route>
              {/* <Route path="/" exact component={Home} /> */}
              <Route path="/dashboard" exact component={Dashboard} />
              <Route path="/login" exact component={Login} />
              <Route path="/signup" exact component={Signup} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon aria-hidden="true" icon={triangle} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>
              <IonTabButton tab="dashboard" href="/dashboard">
                <IonIcon aria-hidden="true" icon={images} />
                <IonLabel>Dashboard</IonLabel>
              </IonTabButton>
              <IonTabButton tab="login" href="/login">
                <IonIcon aria-hidden="true" icon={square} />
                <IonLabel>Login</IonLabel>
              </IonTabButton>
              <IonTabButton tab="signup" href="/signup">
                <IonIcon aria-hidden="true" icon={square} />
                <IonLabel>Signup</IonLabel>
              </IonTabButton>
              <IonTabButton tab="logout" href="/logout">
                <IonIcon aria-hidden="true" icon={square} />
                <IonLabel>Logout</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonReactRouter>
        </IonApp>
      </Suspense>
    </div>
  );
}

export default App;
