import React from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";

const ErrorPage = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Error</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Something went wrong</h2>
        <p>We're sorry, but something went wrong. Please try again later.</p>
      </IonContent>
    </IonPage>
  );
};

export default ErrorPage;
