import React, { createElement, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { useRouter } from  'next/router';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { size } from 'lodash';
import { toast } from 'react-toastify';
import { useAuth } from '../../../../hooks/useAuth';
import { useCart } from '../../../../hooks/useCart';
import { paymentCardApi } from '../../../../api/cart';


export default function FormPayment({products, address}) {

  const { auth, logout } = useAuth();
  const { removeAllProductCart } = useCart();

  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleSubmit = async(e) =>{
    e.preventDefault();
    setLoading(true);

    if(!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const result = await stripe.createToken(cardElement);
    if(result.error) toast.error(result.error.message);
    const response = await paymentCardApi(
      result.token,
      products,
      auth.idUser,
      address,
      logout
    );
    console.log(response);
    setLoading(false);
    if(size(response) > 0){
      toast.success("pedido completado");
      removeAllProductCart();
      router.push('/orders');
    } 
    else toast.error("error al realizar el pedido");
  }

  return (
    <form className="form-payment" onSubmit={handleSubmit}>
      <CardElement/>
      <Button type="submit" loading={loading} disabled={!stripe}>Pagar</Button>
    </form>
  )
}
