import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BasicLayout from "../layout/BasicLayout/BasicLayout";
import { getGameByUrlApi } from '../api/game';
import HeaderGame from '../components/Game/HeaderGame/HeaderGame';
import TabsGame from '../components/Game/TabsGame/TabsGame';
import Seo from '../components/Seo';

export default function Game() {

  const { query } = useRouter();

  const [game, setGame] = useState(null);

  useEffect(() => {
    (async()=>{
      const response = await getGameByUrlApi(query.game);
      setGame(response);
    })();
  }, [query]);

  if(!game) return null;



  return (
    <div>
      <BasicLayout>
        <Seo title={game.title} />
        <HeaderGame game={game} />
        <TabsGame game={game} />
      </BasicLayout>
    </div>
  )
}
