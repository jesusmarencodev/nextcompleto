import React, { useEffect, useState } from "react";
import { getLastGameApi } from "../api/game";
import { Loader } from 'semantic-ui-react'
import BasicLayout from "../layout/BasicLayout";
import { size } from 'lodash';
import ListGames from "../components/ListGames";
import Seo from "../components/Seo";



export default function Home() {

  const [games, setGames] = useState(null);

  useEffect(() => {
    (async()=>{
      const response = await getLastGameApi(20);
      if(size(response) > 0) setGames(response);
      else setGames([]);
    })()
  }, [])

  return (
    <BasicLayout className="home">
      <Seo title="Hola mundo" />
      {!games && <Loader active>Cargando juegos</Loader> }
      {games && size(games) === 0 && (
        <div>
          <h3>No hay juegos</h3>
        </div>
      )}
      {size(games) > 0 && (
        <ListGames games={games}/>
      )}
      
    </BasicLayout>
  );
}
