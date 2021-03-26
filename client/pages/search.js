import React, { useEffect, useState } from 'react';
import { seatchGamesApi } from '../api/game';
import BasicLayout from '../layout/BasicLayout/BasicLayout';
import { useRouter } from 'next/router';
import {size} from 'lodash';
import {Loader} from 'semantic-ui-react';
import ListGames from '../components/ListGames/ListGames';
import Seo from "../components/Seo";

export default function search() {

  const [games, setGames] = useState(null);

  const {query} = useRouter();

  useEffect(() => {
    (async ()=>{
      if(size(query.query) > 0){
        const response = await seatchGamesApi(query.query);
        if(size(response) > 0) setGames(response);
        else setGames([]);
      }else{
        setGames([]);
      }
    })();
  }, [query])
  

  useEffect(() => {
    document.getElementById("search-game").focus();
  }, []);

  

  return (
    <BasicLayout className="search">
      <Seo title={`Buscando ${query.query}`} description="busca tus juegos" />
      {!games && <Loader active>Buscando juegos</Loader>}
      {games && size(games) === 0 && (<div><h3>No se encontraron juegos</h3></div>)}
      {size(games) > 0 && (
        <ListGames
          games={games}
        />
      )}
    </BasicLayout>
  )
}
