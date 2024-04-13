import {FormEvent, useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

import './search-bar.scss'

import {ChannelCard, ChannelPreviewCard, VideoCard, VideoPreviewCard} from "@api2/PreviewCard";
import {GetChannelPreviewCards, SearchByKeyword} from "@api2/backend";
import {BackendError} from "@api2/BackendError";
import ErrorPage from "@/template/error/template";


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
          className={'search-bar-wrapper'}
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

  const [error, setError] = useState<BackendError>();
  const [videoCards, setVideoCards] = useState<VideoPreviewCard[]>([]);
  const [channelCards, setChannelCards] = useState<ChannelPreviewCard[]>([]);
  const [channels, setChannels] = useState<Map<string, ChannelPreviewCard>>(new Map());

  useEffect(() => {
    const GetSearchResults = async () => {
      const keyword = params.get('key')!;

      const searchResults = await SearchByKeyword(keyword)
      if (searchResults instanceof BackendError) {
        setError(searchResults);
        return
      }

      const [vPreviewCards, cPreviewCards] = searchResults;
      setVideoCards(vPreviewCards);
      setChannelCards(cPreviewCards);

      const cards = await GetChannelPreviewCards(vPreviewCards.map(v => v.publisherId));
      if (cards instanceof BackendError) {
        setError(cards);
        return
      }

      const channelMap: Map<string, ChannelPreviewCard> = new Map();
      for (const card of cards)
        channelMap.set(card.id, card);

      setChannels(channelMap);
    }
    GetSearchResults();
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

  return error ? <ErrorPage error={error}/> :
      <>
        <ChannelCards/>
        <VideoCards/>
      </>
}