import { iUser } from "./iAxios";

export const autoSignIn = async (setCurrentUser) => {
  try {
    const { data } = await iUser.get("/owners/1");
    setCurrentUser(data);
  } catch (e) {
    console.log(e);
  }
};
