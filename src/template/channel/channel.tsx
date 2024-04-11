/*
 * Copyright (c) 2024 KnightHat. All Rights Reserved
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import {useParams} from "react-router-dom";
import {IonIcon} from "@ionic/react";

import {useEffect, useState} from "react";

import './channel.scss';
import '@css/preview-card.scss'

import {GetChannelDetails, GetVideosOf} from "@api2/backend";
import {ChannelDetails} from "@api2/DetailsCard";
import {roundToMagnitude} from "@/utils/NumUtils";
import {VideoCard, VideoPreviewCard} from "@api2/PreviewCard";

function sort(value1: number, value2: number, reversed: boolean = false): number {
  const descendingOrder = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
  return (reversed ? -1 : 1) * descendingOrder;
}

export default function ChannelPage() {
  const {channelId} = useParams();

  const [channel, setChannel] = useState<ChannelDetails>();
  const [videos, setVideos] = useState<VideoPreviewCard[]>([]);

  useEffect(() => {
    GetChannelDetails(channelId!).then(card => {
      if (card)
        setChannel(card)
    });

    GetVideosOf(channelId!).then(cards => {
      cards.sort((c1, c2) => sort(c1.since.value, c2.since.value, true));
      setVideos(cards);
    })
  }, []);

  return !channel
      ? null
      : (
          <>
            <div id='channel-banner' className="image-container" style={{backgroundImage: `url(${channel?.banner})`}}></div>
            <section id='channel-visual' className={'pure-g'}>
              <div id='channel-title' className={'pure-u-2-3'}>
                <figure>
                  <img
                      className={'pure-u-1-2 icon-mr-10'}
                      src={channel.thumbnail}
                      alt={`${channel.title}'s logo`}
                  />
                  <figcaption className={'pure-u-1-2'}>
                    <h1>{channel.title}</h1>
                    <sub>{channel.url}</sub>
                  </figcaption>
                </figure>
              </div>
              <div id='channel-statistics' className={'pure-u-1-3'}>
                <div className={'pure-g'}>
                  <button id={'channel-page-subscribe-button'} className={'pure-u-1'}>
                    Subscribe
                    <span className={'divider-line'}></span>
                    {roundToMagnitude(channel.subscribers)}
                  </button>
                  <ul className={'pure-u-1'}>
                    <li>
                      <IonIcon className={'icon-mr-5'} icon='eye-sharp'/>
                      <span>{roundToMagnitude(channel.views)}</span>
                    </li>
                    <li>
                      <IonIcon className={'icon-mr-5'} icon='film-outline'/>
                      <span>247</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
            <section id={'channel-description'} className={'nice-alignment'}>
              <pre>
                <p>{channel.description}</p>
              </pre>
            </section>
            <hr/>
            <section className={'nice-alignment'}>
              <div id='search-result-videos'>
                {videos.map((card, index) =>
                    <VideoCard key={index} video={card} channel={channel}/>
                )}
              </div>
            </section>
          </>
      )
}