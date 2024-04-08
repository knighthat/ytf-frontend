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

import './watch-page.css'

import {Link, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";

import {ChannelPreviewCard, VideoPreviewCard} from "../../api/v2/PreviewCard";
import {GetChannelPreviewCards, GetVideoComment, GetVideoDetails} from "../../api/v2/backend";
import Comment, {CommentCard} from "../../api/v2/Comment";
import {VideoDetails} from "../../api/v2/DetailsCard";

export default function WatchPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [video, setVideo] = useState<VideoPreviewCard>();
  const [channel, setChannel] = useState<ChannelPreviewCard>();
  const [desc, setDesc] = useState("");
  const [comments, setComments] = useState<Comment[]>();

  const videoId = params.get('v');
  const state = location.state;
  useEffect(() => {
    if (videoId) {
      if (state) {
        /*
          State is only available when user clicks on
          video card showed in either main page, or
          search page.
           */
        if (state.videoCard)
          setVideo(state.videoCard);
        if (state.channelCard)
          setChannel(state.channelCard);
      }

      GetVideoDetails(videoId).then(video => {
        if (!video)
          return;

        setVideo(video)
        setDesc(video.description)
      });

      if (!channel)
          /*
          Only query for ChannelPreviewCard when
          it's not passed with VideoPreviewCard from Link
           */
        GetChannelPreviewCards([videoId]).then(card => {
          if (card)
            setChannel(card[0]);
        });

      GetVideoComment(videoId).then(comments => setComments(comments));
    } else
        // Redirect client to main page if no id of video were provided
      navigate('/');

  }, [channel, navigate, state, videoId]);

  if (!video)
    return <></>

  function CommentSection(): JSX.Element {
    if (!comments)
      return <></>

    return (
        <div id={'comment-section'} className={'nice-alignment'}>
          <hr/>
          <h2>{video instanceof VideoDetails ? video.commentCount : '...'} Comments</h2>
          <article>
            {
              comments.map((comment, index) =>
                  <CommentCard key={index} comment={comment}/>
              )
            }
          </article>
        </div>
    )
  }

  return (
      <>
        <section id='player' className={'nice-alignment'}>
          <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen>
          </iframe>
        </section>
        <section className={'nice-alignment'}>
          <div className={'video-title-container'}>
            <h1>{video.title}</h1>
            <sub><b>Uploaded:</b> {(new Date(video.since.value)).toDateString()}</sub>
          </div>
          <Link to={`/${channel?.url}`} className={'channel-container'}>
            <img src={channel?.thumbnail} alt={`${channel?.title}'s logo`}/>
            <span>{channel?.title}</span>
          </Link>
          <details className={'video-description-container'}>
            <summary>Description</summary>
            <pre>
              <p>{desc}</p>
            </pre>
          </details>
        </section>
        <CommentSection/>
      </>
  )
}