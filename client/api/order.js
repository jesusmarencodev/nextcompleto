import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";
import {size} from 'lodash';


export async function getOrderApiApi(idUser, logout) {

  try {
    const url = `${BASE_PATH}/orders?_sort=createdAt:desc&user=${idUser}`;

    return await authFetch(url, null, logout);
    
  } catch (error) {
    console.log(error)
    return null
  }
}
