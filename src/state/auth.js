import { atom } from "recoil";

const atomIsUserLoggedIn = atom({
  key: "atomIsUserLoggedIn",
  default: {
    id: "atomIsUserLoggedIn",
    data: false,
  },
});

export { atomIsUserLoggedIn };
