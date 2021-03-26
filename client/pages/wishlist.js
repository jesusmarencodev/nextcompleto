import React, { useEffect, useState } from 'react';
import BasicLayout from '../layout/BasicLayout/BasicLayout';
import { Icon, Loader } from "semantic-ui-react";
import { size, forEach } from 'lodash';
import { useAuth } from '../hooks/useAuth';
import { getFavoritesApi } from '../api/favorite';
import ListGames from '../components/ListGames/ListGames';


export default function wishlist() {

  const {auth, logout} = useAuth();

  const [games, setGames] = useState(null);

  useEffect(() => {
    (async ()=>{
      const response = await getFavoritesApi(auth.idUser, logout);
      if(size(response) > 0) {
        const gamesList = [];
        forEach(response, (data)=>{
          gamesList.push(data.game);
        });
        setGames(gamesList);
      }else{
        setGames([]);
      }
    })();
  }, []);


  return (
    <BasicLayout className="wishlist">
      <div className="wishlist__block">
        <div className="title">Lista de deseos</div>
        <div className="data">
        {!games && <Loader active>Cargando Juegos</Loader>}
          {games && size === 0 && (
            <div className="data__not-found">
              <h3>No hay Juegos de favoritos</h3>
            </div>
          )}
          {size(games) > 0 && (<ListGames games={games}/>)}
        </div>
      </div>
    </BasicLayout>
  )
}
