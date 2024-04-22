import React, { useEffect, useState } from "react";
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useRecoilState,
  atom,
  useSetRecoilState,
} from "recoil";
// import {
//   fetchUserInfo,
//   fetchData,
//   postData,
// } from "../../dataStore/apiFetchTest";
import { Divider } from "antd";

// import { authAtom, userInfo } from "../../state/auth";
import { atomUserData } from "../../state/atomUserData";

import { EquipmentGrid } from "../form_components/EquipmentGrid";
import { InspectionForm } from "../form_components/InspectionForm";
import { InspectionModal } from "../form_components/InspectionModal";

export const Dashboard = () => {
  const [userData, setUserData] = useRecoilState(atomUserData);
  console.log(userData, "dashboard");

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="two-column-container">
        <div className="dash-left-bar">
          <div>
            <InspectionModal />
          </div>
        </div>
        <div>
          <Divider
            type={"vertical"}
            style={{
              height: "100%",
            }}
          />
        </div>
        <div className="dash-main-content">
          <EquipmentGrid />
        </div>
      </div>
      {/* <InspectionForm /> */}
    </div>
  );
};
