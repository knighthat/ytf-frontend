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

import {VideoPreviewCard, ChannelPreviewCard} from "./PreviewCard";
import {plainToInstance} from "class-transformer";

const API_ENDPOINT: string = `${import.meta.env.VITE_API_ENDPOINT}/v2`;
const IS_DEV: boolean = import.meta.env.DEV;

export async function PopularVideos(): Promise<Array<VideoPreviewCard>> {
  const url = IS_DEV ? '/popular.json' : `${API_ENDPOINT}/popular`;
  try {
    const request = await fetch(url);
    if (request.ok) {
      const data = await request.json();
      return plainToInstance(VideoPreviewCard, data);
    }
  } catch (err) {
    console.log(err);
  }
  return []
}

export async function GetChannelPreviewCards(ids: string[]): Promise<ChannelPreviewCard[]> {
  const url = IS_DEV ? '/channels.json' : `${API_ENDPOINT}/preview/channels`
  try {
    const request = await fetch(`${url}?id=${ids.join(',')}`)
    if (request.ok) {
      const data = await request.json();
      return plainToInstance(ChannelPreviewCard, data);
    }
  } catch (err) {
    console.log(err);
  }
  return []
}

export async function SearchByKeyword(keyword: string): Promise<[VideoPreviewCard[], ChannelPreviewCard[]]> {
  const url = IS_DEV ? '/search.json' : `${API_ENDPOINT}/v2/search?key=${keyword}`;
  try {
    const request = await fetch(url);
    if (request.ok) {
      const videos: VideoPreviewCard[] = [];
      const channels: ChannelPreviewCard[] = [];

      const data = await request.json();
      for (const card of data) {

        if (card.type === 'VIDEO')
          videos.push(plainToInstance(VideoPreviewCard, card as object));
        else if (card.type === 'CHANNEL')
          channels.push(plainToInstance(ChannelPreviewCard, card as object));
      }

      return [videos, channels];
    }
  } catch (err) {
    console.log(err);
  }

  return [[], []];
}