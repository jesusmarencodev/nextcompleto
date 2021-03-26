import { TOKEN } from "../utils/constants";
import jwt_decode from "jwt-decode";

export const setToken = (token) => localStorage.setItem(TOKEN, token);
export const getToken = () => localStorage.getItem(TOKEN);
export const removeToken = () => localStorage.removeItem(TOKEN);
export const hasExpireToken = (token ) => {
  const tokenDecode = jwt_decode(token);

  const expireDate = tokenDecode.exp * 1000;

  const currentDate = new Date().getTime();

  if(currentDate > expireDate){
    return true;
  }

  return false;
}
