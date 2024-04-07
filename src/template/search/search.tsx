import React, {FormEvent, useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

import './search-bar.css'
import '../../assets/css/video-preview-card.css'
import '../../assets/css/channel-preview-card.css'

import {VideoPreviewCard, ChannelPreviewCard} from "../../api/v1/PreviewCard";
import {SearchByKeyword} from "../../api/v1/backend";

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
  useEffect(() => {
    const keyword = params.get('key');
    if (keyword == null)
      return;

    const getCards = async () => {
      const [videos, channels] = await SearchByKeyword(keyword);
      setVideoCards(videos);
      setChannelCards(channels);
    }

    getCards();
  }, [params]);

  return (
      <>
        {
          channelCards.length > 0
              ? (
                  <section className={'nice-alignment'}>
                    <h1>Channels</h1>
                    <hr/>
                    <div id={'search-result-channels'}>
                      {channelCards.map((card, index) => <React.Fragment key={index}>{card.toHtml()}</React.Fragment>)}
                    </div>
                  </section>
              ) : <></>
        }
        {
          videoCards.length > 0
              ? (
                  <section className={'nice-alignment'}>
                    <h1>Videos</h1>
                    <hr/>
                    <div id={'search-result-videos'}>
                      {videoCards.map((card, index) => <React.Fragment key={index}>{card.toHtml()}</React.Fragment>)}
                    </div>
                  </section>
              ) : <></>
        }
      </>
  )
}