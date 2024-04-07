import {FormEvent, useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

import './search-bar.css'
import '../../assets/css/video-preview-card.css'
import '../../assets/css/channel-preview-card.css'

import {ChannelCard, ChannelPreviewCard, VideoCard, VideoPreviewCard} from "../../api/v2/PreviewCard";
import {GetChannelPreviewCards, SearchByKeyword} from "../../api/v2/backend";


export function SearchBar() {
  const [params] = useSearchParams();
  const searchKey = params.get('key');

  /*
    Prevent page from redirecting user to empty search page
   */
  const handleSubmit = (event: FormEvent) => {
    const searchBar = document.getElementById('search-bar') as HTMLInputElement;
    if (searchBar == null || searchBar.value.length === 0)
      event.preventDefault();
  }

  return (
      <form
          className={'search-bar-container'}
          action={'/search'}
          onSubmit={handleSubmit}
      >
        <label htmlFor='search-bar'/>
        <input
            type='text'
            id='search-bar'
            name='key'
            placeholder='Search'
            defaultValue={searchKey ? searchKey : ''}
        />
        <hr/>
      </form>
  )
}

export default function SearchPage() {
  const [params] = useSearchParams();

  const [videoCards, setVideoCards] = useState<VideoPreviewCard[]>([]);
  const [channelCards, setChannelCards] = useState<ChannelPreviewCard[]>([]);
  const [channels, setChannels] = useState<Map<string, ChannelPreviewCard>>();

  useEffect(() => {

    const keyword = params.get('key');
    if (keyword == null)
      return;

    const getCards = async () => {
      const [videos, channels] = await SearchByKeyword(keyword);
      setVideoCards(videos);
      setChannelCards(channels);

      const cIds = () => videos.map(v => v.publisherId);
      const cCards = await GetChannelPreviewCards(cIds());

      const channelMap: Map<string, ChannelPreviewCard> = new Map();
      for (const card of cCards)
        channelMap.set(card.id, card);

      setChannels(channelMap);

    }

    getCards();
  }, [params]);

  function ChannelCards(): JSX.Element {
    if (channelCards.length <= 0)
      return <></>

    return (
        <section className={'nice-alignment'}>
          <h1>Channels</h1>
          <hr/>
          <div id={'search-result-channels'}>
            {channelCards.map((card, index) =>
                <ChannelCard key={index} channel={card}/>
            )}
          </div>
        </section>
    )
  }

  function VideoCards(): JSX.Element {
    if (videoCards.length <= 0)
      return <></>

    return (
        <section className={'nice-alignment'}>
          <h1>Videos</h1>
          <hr/>
          <div id={'search-result-videos'}>
            {videoCards.map((card, index) =>
                <VideoCard key={index} video={card} channel={channels?.get(card.publisherId)}/>
            )}
          </div>
        </section>
    )
  }

  return (
      <>
        <ChannelCards/>
        <VideoCards/>
      </>
  )
}