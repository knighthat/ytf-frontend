import {plainToInstance} from "class-transformer";
import {ChannelPreviewCard, VideoPreviewCard} from "./PreviewCard";
import {VideoPlayer} from "./VideoPlayer";

const API_ENDPOINT: string = import.meta.env.VITE_API_ENDPOINT;
const IS_DEV: boolean = import.meta.env.DEV;

export async function PopularVideos(): Promise<Array<VideoPreviewCard>> {
  const url = import.meta.env.DEV ? '/popular.json' : `${API_ENDPOINT}/v1/popular?max=20`;
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

export async function SearchByKeyword(keyword: string): Promise<[VideoPreviewCard[], ChannelPreviewCard[]]> {
  const url = import.meta.env.DEV ? '/search.json' : `${API_ENDPOINT}/v1/search?key=${keyword}&max=20`;
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

export async function GetVideo(id: string | null): Promise<VideoPlayer | null> {
  if (!id)
    return null;

  const url = IS_DEV ? '/player.json' : `${API_ENDPOINT}/v1/player/${id}`;
  try {
    const request = await fetch(url);
    if (request.ok) {
      const data = await request.json();
      return plainToInstance(VideoPlayer, data as object);
    }
  } catch (err) {
    console.log(err);
  }

  return null;
}