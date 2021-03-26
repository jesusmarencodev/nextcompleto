import React, { useEffect, useState } from "react";
import { getGameByUrlApi } from "../api/game";
import AddressShipping from "../components/Cart/AddressShipping/AddressShipping";
import Payment from "../components/Cart/Payment";
import SummaryCart from "../components/Cart/SummaryCart/SummaryCart";
import { useCart } from "../hooks/useCart";
import BasicLayout from "../layout/BasicLayout/BasicLayout";

export default function cart() {
  const { getProductCart } = useCart();
  const products = getProductCart();


  return !products ? <EmptyCart /> : <FullCart products={products} />;
}

function EmptyCart() {
  return (
    <BasicLayout className="empty-cart">
      <h2>No hay productos en el carrito</h2>
    </BasicLayout>
  );
}

function FullCart({products}) {
  const [productsData, setProductsData] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  const [address, setAddress] = useState(null);
  

  useEffect(() => {
    (async ()=>{
      const productTemp = [];
      //for asincrono
      for await (const product of products){
        const data = await getGameByUrlApi(product);
        productTemp.push(data);
      }
      setProductsData(productTemp);
      setReloadCart(false);
    })();
  }, [reloadCart])

  return (
    <BasicLayout className="empty-cart">
      <SummaryCart products={productsData} setReloadCart={setReloadCart} />
      <AddressShipping setAddress={setAddress}/>
      {address && <Payment products={productsData} address={address} /> }
      
    </BasicLayout>
  );
}
