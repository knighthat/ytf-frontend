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

import {plainToInstance} from "class-transformer";

import {VideoPreviewCard, ChannelPreviewCard} from "./PreviewCard";
import {ChannelDetails, VideoDetails} from "./DetailsCard";
import Comment from "./Comment";
import {BackendError} from "@api2/BackendError";

const API_ENDPOINT: string = `${import.meta.env.VITE_API_ENDPOINT}/v2`;
const IS_DEV: boolean = import.meta.env.DEV;

async function FetchFromBackend(jsonFile: string, path: string, query?: string): Promise<Response | BackendError> {
  function finalURL() {
    if (IS_DEV)
      return `../../../test/json/${jsonFile}.json`
    else
      return `${API_ENDPOINT}/${path}?${query}`;
  }

  const request = await fetch(finalURL());

  if (request.ok)
    return request;
  else {
    const payload = (await request.json()) as object;
    const error = plainToInstance(BackendError, payload);
    error.method = "GET"
    error.status = request.status;
    error.headers = request.headers;
    error.url = request.url;
    return error;
  }
}

export async function PopularVideos(): Promise<VideoPreviewCard[] | BackendError> {
  const request = await FetchFromBackend('popular', 'popular', undefined);

  if (request instanceof Response) {
    const data = await request.json();
    return plainToInstance(VideoPreviewCard, data);
  } else
    return request;
}

export async function GetChannelPreviewCards(ids: string[]): Promise<ChannelPreviewCard[] | BackendError> {
  const request = await FetchFromBackend('channels', 'preview/channels', `id=${ids.join(',')}`);

  if (request instanceof Response) {
    const data = await request.json();
    return plainToInstance(ChannelPreviewCard, data);
  } else
    return request;
}

export async function SearchByKeyword(keyword: string): Promise<[VideoPreviewCard[], ChannelPreviewCard[]] | BackendError> {
  const request = await FetchFromBackend('search', 'search', `key=${keyword}`)

  if (request instanceof Response) {
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
  } else
    return request;
}

export async function GetVideoDetails(id: string): Promise<VideoDetails | BackendError> {
  const request = await FetchFromBackend('video-details', 'details/video', `id=${id}`);

  if (request instanceof Response) {
    const data = await request.json();
    return plainToInstance(VideoDetails, data as object);
  } else
    return request;
}

export async function GetVideoComment(id: string): Promise<Comment[] | BackendError> {
  const request = await FetchFromBackend('video-comments', 'comments', `videoId=${id}`);

  if (request instanceof Response) {
    const data = await request.json();
    return plainToInstance(Comment, data);
  } else
    return request;
}

export async function GetChannelDetails(id?: string, handle?: string): Promise<ChannelDetails | BackendError> {
  if (!id && !handle)
    throw SyntaxError('Either \"id\" or \"handle\" must be provided!' );

  const query = id ? `id=${id}` : `channelHandle=${handle}`;
  const request = await FetchFromBackend('channel-details', 'details/channel', query);

  if (request instanceof Response) {
    const data = await request.json();
    return plainToInstance(ChannelDetails, data as object);
  } else
    return request;
}

export async function GetVideosOf(channelId: string): Promise<VideoPreviewCard[] | BackendError> {
  const request = await FetchFromBackend('search-videos-of', 'search', `channelId=${channelId}`);

  if (request instanceof Response) {
    const cards: VideoPreviewCard[] = [];

    const data = await request.json();
    for (const card of data)
      if (card.type === 'VIDEO')
        cards.push(plainToInstance(VideoPreviewCard, card as object));

    return cards;
  } else
    return request;
}