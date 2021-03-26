import React from "react";
import { Tab } from "semantic-ui-react";
import ReactPlayer from "react-player/lazy";
import CarouselScreeansShots from "../CarouselScreeansShots";
import moment from 'moment';
import "moment/locale/es";

export default function InfoGame({ game }) {
  const { video, screenshots, title, sumarry, releaseDate } = game;

  return (
    <div className="info-game">
      <ReactPlayer
        className="info-game__video"
        url={video}
        controls={true}
      />
      <CarouselScreeansShots
        title={title}
        screenshots={screenshots}
      />
      <div className="info-game__content">
        <div dangerouslySetInnerHTML={{__html:sumarry}} />
        <div className="info-game__content-date">
          <h4>Fecha de lanzamiento :</h4>
          <p>{moment(releaseDate).format("LL")}</p>
        </div>
      </div>
    </div>
  );
}
