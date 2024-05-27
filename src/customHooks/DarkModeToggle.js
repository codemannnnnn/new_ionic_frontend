import { IonButton } from "@ionic/react";
import React, { useState } from "react";

export const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("light", !darkMode);
  };

  return <IonButton onClick={toggleDarkMode}>Toggle</IonButton>;
};
