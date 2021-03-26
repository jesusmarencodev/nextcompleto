import React, { useEffect, useState } from 'react';
import { Grid, Image, Icon, Button } from "semantic-ui-react";
import { size } from 'lodash';
import { addFavoriteApi, isFavoriteApi, deleteFavoriteApi } from '../../../api/favorite';
import { useAuth } from '../../../hooks/useAuth';
import classNames from 'classnames';
import { useCart } from '../../../hooks/useCart';

export default function HeaderGame({game}) {

  const { poster, title, sumarry, price, discount, id, url } = game;
  

  return (
    <Grid className="header-game">
      <Grid.Column mobile={16} tablet={6} computer={5}>
        <Image src={poster.url} alt={title} fluid />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={10} computer={11}>
        <Info title={title} sumarry={sumarry} price={price} discount={discount} id={id} url={url} />
      </Grid.Column>
    </Grid>
  )
}


function Info({title, sumarry, price, discount, id, url}){

  const [isFavorite, setIsFavorite] = useState(false);
  const [reloadFavorite, setReloadFavorite] = useState(false);
  const { auth, logout } = useAuth();

  const { addProductCart } = useCart();



  useEffect(()=>{
    (async ()=>{
      const response = await isFavoriteApi(auth.idUser, id, logout);
      if(size(response) > 0) setIsFavorite(true);
      else setIsFavorite(false);
    })();
    setReloadFavorite(false);
    
  }, [id, reloadFavorite]);

  const addFavorite = async() =>{
    if(auth){
      await addFavoriteApi(auth.idUser, id, logout);
      setReloadFavorite(true);
    }
  }

  const removeFavorite = async() => {
    const response = await deleteFavoriteApi(auth.idUser, id, logout);
    console.log(response);
    setReloadFavorite(true);
  }

  return (
    <>
    <div className="header-game__title">
      {title}
      <Icon
        name={isFavorite ? "heart" : "heart outline"}
        className={classNames({
          like : isFavorite
        })}
        link
        onClick={isFavorite ? removeFavorite : addFavorite}
      />
    </div>
    <div className="header-game__delivery">
      Entrega enb 24/48 horas
    </div>
    <div className="header-game__summary" dangerouslySetInnerHTML={{__html:sumarry}}></div>
    <div className="header-game__buy">
      <div className="header-game__buy-price">
        <p>Precio de venta al publico: {price}$</p>
        <div className="header-game__buy-price-actions">
          {discount && <p>{discount}%</p>}
          {discount && <p>{price - Math.floor(price*discount) / 100 }$</p>}
          {!discount && <p>{price}$</p>}
        </div>
      </div>
      <Button className="header-game__buy-btn" onClick={()=>addProductCart(url)}> Comprar</Button>
    </div>
    </>
  )
}
