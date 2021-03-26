import { BASE_PATH, CART } from "../utils/constants";
import { authFetch } from "../utils/fetch";
import {size, includes, remove} from 'lodash';
import { toast } from 'react-toastify';

export function getProductCart(idUser, idGame, logout) {

  const cart = localStorage.getItem(CART);

  if(!cart){
    return null;
  }else {
    const products = cart.split(",");
    return products;
  }
}

export function addProductCart(product){
  let cart = getProductCart();
  if(!cart){
    localStorage.setItem(CART, product);
    toast.success("producto añadido al carrito");
  }else{
    console.log('paso2');
    const producFound = includes(cart, product);
    if(producFound){
      toast.warning("El producto ya esta añadido al carrito");
    }else{
      cart.push(product);
      localStorage.setItem(CART, cart);
      toast.success("producto añadido correctamente");
    }
    
  }
}

export function countProductCart(){
  const cart = getProductCart();

  if(!cart) return 0;
  return size(cart);
}

export function removeProductCart(product){
  const cart = getProductCart();

  remove(cart, (item)=>{
    return item === product;
  });
  if(size(cart)>0){
    localStorage.setItem(CART, cart);
  }else{
    localStorage.removeItem('cart');
  }

}

export async function paymentCardApi(token, products, idUser, address, logout){
  try {
    const addressShipping = address;
    delete addressShipping.user;
    delete addressShipping.createdAt

    const url = `${BASE_PATH}/orders`;

    const params = {
      method : "POST",
      headers : {
        "Content-Type": "application/JSON"
      },
      body : JSON.stringify({
        token,
        products,
        idUser,
        addressShipping
      })
    }

    const result = await authFetch(url, params, logout);

    return result;
    
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function removeAllProductCart(){
  localStorage.removeItem(CART);
}