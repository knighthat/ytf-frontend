import {plainToInstance} from "class-transformer";
import {CardType, ChannelPreviewCard, VideoPreviewCard} from "./PreviewCard";

const API_ENDPOINT: string = import.meta.env.VITE_API_ENDPOINT;

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

      (await request.json()).map(card => {

        if (card.type === 'VIDEO')
          return plainToInstance(VideoPreviewCard, card)
        else if (card.type === 'CHANNEL')
          return plainToInstance(ChannelPreviewCard, card);

      }).forEach(card => {

        if (card == null)
          return;

        if (card.type == CardType.VIDEO)
          videos.push(card as VideoPreviewCard);
        if (card.type == CardType.CHANNEL)
          channels.push(card as ChannelPreviewCard);

      });

      return [videos, channels];
    }
  } catch (err) {
    console.log(err);
  }

  return [[], []];
}