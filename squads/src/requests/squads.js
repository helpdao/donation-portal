import { requestApi } from "./core";

export const createSquad = async body => {
  try {
    const requestObject = { url: "squad/new", method: "POST", body };
    const result = await requestApi(requestObject);
    return result;
  } catch (e) {
    console.log(e);
  }
};

export const allSquads = async () => {
  try {
    const requestObject = { url: "squad/all" };
    const result = await requestApi(requestObject);
    return result;
  } catch (e) {
    console.log(e);
  }
}

export const squadDetails = async id => {
  try {
    const requestObject = { url: `squad/${id}` };
    const result = await requestApi(requestObject);
    return result;
  } catch (e) {
    console.log(e);
  }
}