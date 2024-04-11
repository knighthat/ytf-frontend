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
import {ChannelDetails, VideoDetails} from "./DetailsCard";
import Comment from "./Comment";

const API_ENDPOINT: string = `${import.meta.env.VITE_API_ENDPOINT}/v2`;
const IS_DEV: boolean = import.meta.env.DEV;

function GetJson(name: string): string {
  return `../../../test/json/${name}.json`;
}

export async function PopularVideos(): Promise<Array<VideoPreviewCard>> {
  const url = IS_DEV ? GetJson('popular') : `${API_ENDPOINT}/popular`;
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
  const url = IS_DEV ? GetJson('channels') : `${API_ENDPOINT}/preview/channels`
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
  const url = IS_DEV ? GetJson('search') : `${API_ENDPOINT}/search?key=${keyword}`;
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

export async function GetVideoDetails(id: string): Promise<VideoDetails | null> {
  const url = IS_DEV ? GetJson('video-details') : `${API_ENDPOINT}/details/video?id=${id}`;
  try {
    const request = await fetch(url);
    if (request.ok) {
      const data = await request.json();
      return plainToInstance(VideoDetails, data as object);
    }
  } catch (err) {
    console.log(err);
  }
  return null
}

export async function GetVideoComment(id: string): Promise<Comment[]> {
  const url = IS_DEV ? GetJson('video-comments') : `${API_ENDPOINT}/comments?videoId=${id}`;
  try {
    const request = await fetch(url);
    if (request.ok) {
      const data = await request.json();
      return plainToInstance(Comment, data);
    }
  } catch (err) {
    console.log(err);
  }
  return [];
}

export async function GetChannelDetails(id: string): Promise<ChannelDetails | null> {
  const url = IS_DEV ? GetJson('channel-details') : `${API_ENDPOINT}/details/channel?id=${id}`
  try {
    const request = await fetch(url);
    if (request.ok) {
      const data = await request.json();
      return plainToInstance(ChannelDetails, data as object);
    }
  } catch (err) {
    console.error(err);
  }
  return null;
}

export async function GetVideosOf(channelId: string): Promise<VideoPreviewCard[]> {
  const url = IS_DEV ? GetJson('search-videos-of') : `${API_ENDPOINT}/search?channelId=${channelId}`;
  try {
    const request = await fetch(url);
    if (request.ok) {
      const data = await request.json();
      const cards: VideoPreviewCard[] = [];

      for (const card of data)
        if (card.type === 'VIDEO')
          cards.push(plainToInstance(VideoPreviewCard, card as object));

      return cards;
    }
  } catch (err) {
    console.log(err)
  }
  return [];
}