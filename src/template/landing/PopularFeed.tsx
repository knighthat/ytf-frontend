import {plainToInstance} from 'class-transformer';
import React, {useEffect, useState} from "react";

import './preview-card.css'

import PreviewCard from "../../api/PreviewCard";

async function fromBackend(): Promise<Array<PreviewCard>> {
  try {
    const request = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/v1/popular?max=20`);
    if (request.ok) {
      const data = await request.json();
      return plainToInstance(PreviewCard, data)
    }
  } catch (err) {
    console.log(err)
  }
  return []
}

export default function PopularFeed() {

  const [cards, setCards] = useState<JSX.Element[]>([]);
  useEffect(() => {
    const cardArray = async () => {
      const backend = await fromBackend();
      setCards(backend.map(video => video.toHTML()));
    }

    cardArray();
  }, []);


  return (
      <div id='trending-feed' className={"pure-g"}>
        {cards.map(element => (
            <React.Fragment key={element.key}>{element}</React.Fragment>)
        )}
      </div>
  )
}