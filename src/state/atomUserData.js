import React, { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

const atomUserData = atom({
  key: "atomUserData",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export { atomUserData };
