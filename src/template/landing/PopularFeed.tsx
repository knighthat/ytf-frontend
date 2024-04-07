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

import {useEffect, useState} from "react";

import '../../assets/css/preview-card.css'

import {ChannelPreviewCard, readableDuration, VideoPreviewCard} from "../../api/v2/PreviewCard";
import {GetChannels, PopularVideos} from "../../api/v2/backend";
import {Link} from "react-router-dom";
import {IonIcon} from "@ionic/react";
import {timeFromNow} from "../../api/v2/InfoContainer";

function ToHTML(card: { video: VideoPreviewCard, channel?: ChannelPreviewCard }) {
  const video = card.video;
  const channel = card.channel;

  const [cUrl, setCUrl] = useState('');
  const [cTitle, setCTitle] = useState('Fetching...')
  const [cThumbnail, setCThumbnail] = useState('/icons/loading-profile-picture-32x32.webp')

  useEffect(() => {
    if (!channel)
      return;

    if (channel.url)
      setCUrl(channel.url);
    if (channel.title)
      setCTitle(channel.title);
    if (channel.thumbnail)
      setCThumbnail(channel.thumbnail);

  }, [channel]);

  return (
      <Link id={video.id} className={"pure-u video-preview-card preview-card"} to={`/watch?v=${video.id}`}>
        <div className={"preview-thumbnail-container"}>
          <img
              className={"preview-thumbnail"}
              src={`https://i.ytimg.com/vi/${video.id}/sddefault.jpg`}
              alt=""
          />
          <div className={"preview-duration-layout"}>
            <div className={"preview-duration"}>
              <span>{readableDuration(video.duration)}</span>
            </div>
          </div>
        </div>
        <div className={"preview-description-container"}>
          <h3>{video.title}</h3>
          <Link to={`/${cUrl}`} className={"pure-g preview-channel-section"}>
            <img className={"pure-u-1-4"}
                 src={cThumbnail}
                 alt=''
            />
            <span className={"pure-u-3-4"}>{cTitle}</span>
          </Link>
        </div>
        <div className={"pure-g preview-video-statistics-container"}>
            <span className={"pure-u-1-4"}>
              <IonIcon icon="thumbs-up-sharp"/>
              {video.getLikesAsString()}
            </span>
          <span className={"pure-u-1-4"}>
              <IonIcon icon="eye-sharp"/>
            {video.getViewsAsString()}
            </span>
          <span className={"pure-u-1-2"}>
              <IonIcon icon="time-sharp"/>
            {timeFromNow(video.since.value)}
            </span>
        </div>
      </Link>
  )
}

export default function PopularFeed() {
  const [videos, setVideos] = useState<VideoPreviewCard[]>([]);
  const [channels, setChannels] = useState<Map<string, ChannelPreviewCard>>();
  useEffect(() => {
    const getVideos = async () => {
      const popular = await PopularVideos();
      setVideos(popular);

      const cIds = () => popular.map(v => v.publisherId);
      const cCards = await GetChannels(cIds());

      const channelMap: Map<string, ChannelPreviewCard> = new Map();
      for (const card of cCards)
        channelMap.set(card.id, card);

      setChannels(channelMap);
    }
    getVideos();
  }, []);

  return (
      <div id='trending-feed' className={"pure-g"}>
        {videos.map((card) => <ToHTML video={card} channel={channels?.get(card.publisherId)}/>)}
      </div>
  )
}