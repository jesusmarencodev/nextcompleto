import { BASE_PATH } from "../utils/constants";



export async function getLastGameApi(limit) {

  try {
    const limitItems = `?_limit=${limit}`
    const sortTtem=`&_sort=createdAt:desc`
    const url = `${BASE_PATH}/games${limitItems}${sortTtem}`;
    const response = await fetch(url);

    const result = await response.json();

    return result;
   
    
  } catch (error) {
    console.log(error)
    return null
  }
}


export async function getGamePlatformApi(platform, limit, start) {

  try {

    const limitItems = `_limit=${limit}`;
    const sortItem = `_sort=createdAt:desc`;
    const startItems= `_start=${start}`;

    const url = `${BASE_PATH}/games?platform.url=${platform}&${limitItems}&${sortItem}&${startItems}`;

    const response = await fetch(url);

    const result = await response.json();

    return result;
   
    
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getTotalGamePlatformApi(platform) {

  try {

 

    const url = `${BASE_PATH}/games/count?platform.url=${platform}`;

    const response = await fetch(url);

    const result = await response.json();

    return result;
   
    
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getGameByUrlApi(path) {
  try {
    const url = `${BASE_PATH}/games?url=${path}`;
    const response = await fetch(url);
    const result = await response.json();
    return result[0];
    
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function seatchGamesApi(title) {
  try {
    const url = `${BASE_PATH}/games?_q=${title}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
    
  } catch (error) {
    console.log(error)
    return null
  }
}