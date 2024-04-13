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

import './popular-feed.scss'
import '@css/preview-card.scss'

import {ChannelPreviewCard, VideoPreviewCard, VideoCard} from "@api2/PreviewCard";
import {GetChannelPreviewCards, PopularVideos} from "@api2/backend";
import {BackendError} from "@api2/BackendError";
import ErrorPage from "@/template/error/template";

export default function PopularFeed() {
  const [error, setError] = useState<BackendError>();
  const [videos, setVideos] = useState<VideoPreviewCard[]>();
  const [channels, setChannels] = useState<Map<string, ChannelPreviewCard>>();

  useEffect(() => {
    const GetPopularVideos = async () => {
      const popularVideos = await PopularVideos();
      if (popularVideos instanceof BackendError) {
        setError(popularVideos);
        return;
      } else
        setVideos(popularVideos);

      const channels = await GetChannelPreviewCards(popularVideos.map(v => v.publisherId));
      if (channels instanceof BackendError) {
        setError(channels);
        return;
      } else {
        const channelMap: Map<string, ChannelPreviewCard> = new Map();

        for (const card of channels)
          channelMap.set(card.id, card);

        setChannels(channelMap)
      }
    };
    GetPopularVideos();
  }, []);

  return error ? <ErrorPage error={error}/> :
      <div id='popular-feed' className={"pure-g"}>
        {videos?.map((card, index) =>
            <VideoCard key={index} video={card} channel={channels?.get(card.publisherId)}/>
        )}
      </div>
}