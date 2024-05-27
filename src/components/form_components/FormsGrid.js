import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";

import { IonGrid, IonRow, IonCol } from "@ionic/react";

export const FormsGrid = () => {
  const [questions, setQuestions] = useState([]);
  //   useEffect(() => {
  //     axios.get("http://localhost:4005/user_data/1").then((res) => {
  //       setQuestions(res.data.form[0].formQuestions);
  //     });
  //   }, []);
  {
    // console.log(data);
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IonGrid>
        <IonRow>
          {/* {questions.map((item, index) => (
            <IonCol key={index}>
              <p>{item.question}</p>
            </IonCol>
          ))} */}
        </IonRow>
      </IonGrid>
    </Suspense>
  );
};
