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

import {ChannelPreviewCard, VideoPreviewCard, VideoCard} from "../../api/v2/PreviewCard";
import {GetChannelPreviewCards, PopularVideos} from "../../api/v2/backend";

export default function PopularFeed() {
  const [videos, setVideos] = useState<VideoPreviewCard[]>([]);
  const [channels, setChannels] = useState<Map<string, ChannelPreviewCard>>();
  useEffect(() => {
    const getVideos = async () => {
      const popular = await PopularVideos();
      setVideos(popular);

      const cIds = () => popular.map(v => v.publisherId);
      const cCards = await GetChannelPreviewCards(cIds());

      const channelMap: Map<string, ChannelPreviewCard> = new Map();
      for (const card of cCards)
        channelMap.set(card.id, card);

      setChannels(channelMap);
    }
    getVideos();
  }, []);

  return (
      <div id='trending-feed' className={"pure-g"}>
        {videos.map((card, index) =>
            <VideoCard key={index} video={card} channel={channels?.get(card.publisherId)}/>
        )}
      </div>
  )
}