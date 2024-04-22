import { React, Suspense } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
// import ExploreContainer from "../components/ExploreContainer";
import { call, person, settings } from "ionicons/icons";
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
// import { fetchData } from "../../dataStore/apiFetchTest";
// import { useNavigate } from "react-router-dom";

// import { authAtom, usersAtom } from "../../state/auth";
// import { useUserUtils } from "../Utils/userUtils";

// import { fetchUserInfo } from "../../dataStore/apiFetchTest";
// const {log}

export const Home = () => {
  //   const setAuth = useSetRecoilState(authAtom);
  // const nav = useNavigate();

  // const testData = useRecoilValue(fetchUserInfo);
  // const { data } = testData;

  //   const userActions = useUserUtils();
  //   const { logUserOut } = userActions;

  const btnClicked = (e) => {
    const { name } = e.target;
    if (name === "login") {
      //route to login screen or modal
      // nav("login");
    }

    if (name === "signup") {
      //route to signup page
      // nav("signup");
    }
    if (name === "logout") {
      //route to signup page
      //   logUserOut();
      // nav("/");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ExploreContainer name="Tab 1 page" /> */}
      </IonContent>
    </IonPage>
  );
};
