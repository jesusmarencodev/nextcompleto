import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import jwt_decode from "jwt-decode";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'semantic-ui-css/semantic.min.css';
import AuthContext from '../context/AuthContext';
import "../scss/global.scss";
import { setToken, getToken, removeToken } from '../api/token';
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartContext from '../context/CartContext';
import { addProductCart, countProductCart, getProductCart, removeAllProductCart, removeProductCart } from '../api/cart';



function MyApp({ Component, pageProps }) {

  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
  const [totalProductCart, setTotalProductCart] = useState(0);
  const [reloadCart, setReloadCart] = useState(false);
  const router = useRouter()

  useEffect(() => {
    const token = getToken();
    if(token){
      setAuth({
        token,
        idUser : jwt_decode(token).id
      });
    }else{
      setAuth(null);
    }
    setReloadUser(false);
  }, [reloadUser]);


  useEffect(() => {
    setTotalProductCart(countProductCart);

    setReloadCart(false);

  }, [reloadCart, auth]);

  const login = (token) => {
    setToken(token);
    setAuth({
      token,
      idUser : jwt_decode(token).id
    })
  }

  const logout = () => {
    if(auth){
      removeToken();
      setAuth(null);
      router.push("/");
    }
  }
  

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),[auth]);


    const addProduct = (product) => {
      const token = getToken();
      if(token){
        addProductCart(product);
        setReloadCart(true);
      }else{
        toast.warning("para comprar un juego debes iniciar sesion");
      }
    }

    const removeProduct = (product) => {
      removeProductCart(product);
      setReloadCart(true);
    }

    
    const cartData = useMemo(
      () => ({
        productsCart : totalProductCart,
        addProductCart : (product)=> addProduct(product),
        getProductCart : getProductCart,
        removeProductCart : (product) => removeProduct(product),
        removeAllProductCart : removeAllProductCart
      }),[totalProductCart]);

  if(auth === undefined) return null;
  


  return (
    <AuthContext.Provider value={ authData }>
      <CartContext.Provider value={cartData}>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
      </CartContext.Provider>
    </AuthContext.Provider>
  )      
}

export default MyApp
