import React, { useEffect, useState } from 'react'
import BasicLayout from '../../layout/BasicLayout/BasicLayout';
import { useRouter } from 'next/router';
import { getGamePlatformApi, getTotalGamePlatformApi } from '../../api/game';
import { size, map } from 'lodash';
import { Loader } from "semantic-ui-react";
import ListGames from '../../components/ListGames/ListGames';
import Pagination from '../../components/Pagination/Pagination';


const limitPerPage = 3;

export default function Platform() {

  const { query } = useRouter();
  const [games, setGames] = useState(null);
  const [totalGames, setTotalGames] = useState(null);


  const getStartItem = () => {
    const currentPages = parseInt(query?.page);
    if(!query.page || currentPages === 1) return 0;
    else return currentPages * limitPerPage - limitPerPage;
  }

  

  useEffect(() => {
    if(query.platform){
      (async () => {
        const response = await getGamePlatformApi(
          query.platform,
          limitPerPage,
          getStartItem()
        );
        setGames(response);
      })()
    }
  }, [query]);

  useEffect(() => {
    if(query.platform){
      (async () => {
        const response = await getTotalGamePlatformApi(query.platform);
        setTotalGames(response);
      })()
    }
  }, [query])



  
  
  return (
    <div>
        <BasicLayout className="platform">
          {!games && <Loader active>Cargando Juegos</Loader>}
          {games && size === 0 && (
            <div>
              <h3>No hay Juegos</h3>
            </div>
          )}
          {size(games) > 0 && (<ListGames games={games}/>)}
          {totalGames ? (
            <Pagination
              totalGames={totalGames}
              page={query.page ? parseInt(query.page) : 1}
              limitPerPage={limitPerPage}
            /> 
          )
          : null }
        </BasicLayout>
        
        
    </div>
  )
}
