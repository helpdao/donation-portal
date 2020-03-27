import { API } from "./core";
import axios from 'axios'
const ENDPOINT = API + '/squad'

//GET SQUADS
export function allSquads(){
  return new Promise((resolve, reject) => {
    axios.get(`${ENDPOINT}/all`).then(
      (response)=> {
        resolve(response)
      }).catch((err) => reject(err))
  });
}
export function allVerifiedSquads(){
  return new Promise((resolve, reject) => {
    axios.get(`${ENDPOINT}/all/verified`).then(
      (response)=> {
        resolve(response)
      }).catch((err) => reject(err))
  });
}
export function allUnverifiedSquads(){
  return new Promise((resolve, reject) => {
    axios.get(`${ENDPOINT}/all/unverified`).then(
      (response)=> {
        resolve(response)
      }).catch((err) => reject(err))
  });
}
export function squadDetails(id){
  return new Promise((resolve, reject) => {
    axios.get(`${ENDPOINT}/${id}`).then(
      (response)=> {
        resolve(response)
      }).catch((err) => reject(err))
  });
}
export function createSquad(data){
  return new Promise((resolve, reject) => {
    console.log("MANDAMOS:")
    console.log(data)
    axios.post(`${ENDPOINT}/new`,data).then(
      (response)=> {
        resolve(response)
      }).catch((err) => reject(err))
  });
}
export function findSquad(data){
  return new Promise((resolve, reject) => {
    axios.post(`${ENDPOINT}/find`, {data}).then(
      (response)=> {
        resolve(response)
      }).catch((err) => reject(err))
  });
}
// export const createSquad = async body => {
//   return new Promise((resolve, reject) => {
//     let requestObject = { url: "squad/new", method: "POST", body };
//     requestApi(requestObject).then((data) => {
//       resolve(data);
//     }).catch((error) => {
//       reject(error)
//     });
//   })
// };

// export const allSquads = async () => {
//   try {
//     const requestObject = { url: "squad/all" };
//     const result = await requestApi(requestObject);
//     return result;
//   } catch (e) {
//     console.log(e);
//   }
// }

// export const squadDetails = async id => {
//   try {
//     const requestObject = { url: `squad/${id}` };
//     const result = await requestApi(requestObject);
//     return result;
//   } catch (e) {
//     console.log(e);
//   }
// }