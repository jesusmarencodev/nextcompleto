import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";
import {size} from 'lodash';


export async function isFavoriteApi(idUser, idGame, logout) {

  try {
    const url = `${BASE_PATH}/favorites?user=${idUser}&game=${idGame}`;
    return await authFetch(url, null, logout);
    
  } catch (error) {
    console.log(error)
    return null
  }
}


export async function addFavoriteApi(idUser, idGame, logout) {

  try {

    const dataFound = await isFavoriteApi(idUser, idGame, logout);
    console.log(dataFound);
    if(size(dataFound > 0)){
      return "Este juego ya esta en tus favoritos"
    }else{
      const url = `${BASE_PATH}/favorites?user=${idUser}&game=${idGame}`;
      const params = {
        method : "POST",
        headers : {
          "Content-Type": "application/JSON"
        },
        body : JSON.stringify({
          user : idUser,
          game : idGame
        })
      }

      const result = await authFetch(url, params, logout);

      return result; 
    }

    
  } catch (error) {
    console.log(error)
    return null
  }
}


export async function deleteFavoriteApi(idUser, idGame, logout) {
  console.log("eliminando favoriotos");

  try {

    const dataFound = await isFavoriteApi(idUser, idGame, logout);
    console.log(dataFound);
    console.log(size(dataFound));
   
    const url = `${BASE_PATH}/favorites/${dataFound[0]?._id}`;
    const params = {
      method : "DELETE",
      headers : {
        "Content-Type": "application/JSON"
      }
    }

    const result = await authFetch(url, params, logout);
    return result; 

    
  } catch (error) {
    console.log(error)
    return null
  }
}


export async function getFavoritesApi(idUser, logout) {

  console.log("trayendo favoritos");

  try {

    const url = `${BASE_PATH}/favorites?user=${idUser}`;
    console.log(url);
    const result = await authFetch(url, null, logout);
    return result; 

  } catch (error) {
    console.log(error)
    return null
  }
}
