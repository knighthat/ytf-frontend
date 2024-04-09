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

import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import './channel.scss';
import '../../assets/css/preview-card.scss'

import {GetChannelDetails, GetVideosOf} from "../../api/v2/backend";
import {ChannelDetails} from "../../api/v2/DetailsCard";
import {IonIcon} from "@ionic/react";
import {roundToMagnitude} from "../../utils/NumUtils";
import {VideoCard, VideoPreviewCard} from "../../api/v2/PreviewCard";

export default function ChannelPage() {
  const {channelId} = useParams();
  const navigate = useNavigate();

  const [channel, setChannel] = useState<ChannelDetails>();
  const [videos, setVideos] = useState<VideoPreviewCard[]>([]);
  useEffect(() => {

    if (channelId) {

      GetChannelDetails(channelId)
          .then(card => {
            if (card)
              setChannel(card);
          })

      GetVideosOf(channelId).then(cards => {
        cards.sort((c1, c2) => {
          const c1_unix = c1.since.value, c2_unix = c2.since.value;
          if (c2_unix < c1_unix)
            return -1;
          else if (c2_unix > c1_unix)
            return 1;
          else
            return 0;
        })
        setVideos(cards)
      });
    } else
      navigate('/')

  }, [channelId, navigate]);

  function ChannelBanner(): JSX.Element {
    return <div id='channel-banner' className="image-container" style={{backgroundImage: `url(${channel?.banner})`}}></div>
  }

  if (!channel)
    return <></>

  return (
      <>
        <ChannelBanner/>
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