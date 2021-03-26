import React, { useEffect, useState } from 'react';
import { getOrderApiApi } from '../api/order';
import { Grid } from 'semantic-ui-react';
import BasicLayout from '../layout/BasicLayout/BasicLayout';
import { useAuth } from '../hooks/useAuth';
import { size, map } from 'lodash';
import OrderBuy from '../components/OrderBuy';
import Seo from "../components/Seo";

export default function Orders() {

  const { auth, logout } = useAuth();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async()=>{
      const response = await getOrderApiApi(auth.idUser, logout);
      if(response) setOrders(response || []);
    })();
  }, [])

  return (
    <BasicLayout className="orders">
      <Seo title="mis pedidos" description="listado de los pedidos" />
      <div className="orders__block">
        <div className="title">Mis pedidos</div>
        <div className="data">
          {size(orders === 0) ? (
            <h2 style={{ textAlign: "center "}}> aaun no tienes compras</h2>
          ):(
            <OrderList orders={orders}/>
          )}
        </div>
      </div>
    </BasicLayout>
  )
}


function OrderList({orders}){
  return (
    <Grid>
      {map(orders, (order)=>(
        <Grid.Column key={order.id} mobile={16} table={8} computer={8}>
          <OrderBuy order={order}/>
        </Grid.Column>
      ))}
    </Grid>
  )
}