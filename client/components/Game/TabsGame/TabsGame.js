import React from 'react';
import { Tab } from "semantic-ui-react";
import { size } from 'lodash';
import InfoGame from '../InfoGame';

export default function TabsGame({game}) {


  const panes = [
    {
      menuItem : "Informacion",
      render : () =>(
        <Tab.Pane>
          <InfoGame game={game}/>
        </Tab.Pane>
      )
    },
    {
      menuItem : "Comentarios",
      render : () =>(
        <Tab.Pane>
          <h2>Comentarios</h2>
        </Tab.Pane>
      )
    },
  ]
  return (
    <Tab className="tabs-game" panes={panes} />
  )
}
