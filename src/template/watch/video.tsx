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

import './watch-page.scss'

import {Link, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";

import {ChannelPreviewCard} from "../../api/v2/PreviewCard";
import {GetChannelDetails, GetVideoComment, GetVideoDetails} from "../../api/v2/backend";
import Comment, {CommentCard} from "../../api/v2/Comment";
import {VideoDetails} from "../../api/v2/DetailsCard";

export default function WatchPage() {
  const [params] = useSearchParams();

  const [video, setVideo] = useState<VideoDetails>();
  const [channel, setChannel] = useState<ChannelPreviewCard>();
  const [comments, setComments] = useState<Comment[]>();

  const videoId = params.get('v');
  useEffect(() => {
    GetVideoDetails(videoId!).then(card => {
      if (card)
        setVideo(card);
    });
  }, []);

  useEffect(() => {
    if (!video)
      return;

    GetChannelDetails(video.publisherId).then(card => {
      if (card)
        setChannel(card);
    });

    GetVideoComment(video.id).then(cards => setComments(cards));
  }, [video]);

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

  return !video
      ? null
      : (
          <>
            <section id='player'>
              <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen>
              </iframe>
            </section>
            <section className={'nice-alignment'}>
              <div id={'video-title'}>
                <h1>{video.title}</h1>
                <sub><b>Uploaded:</b> {(new Date(video.since.value)).toDateString()}</sub>
              </div>
              <Link to={`/${channel?.url}`} id={'video-publisher'}>
                <img className={'icon-mr-10'} src={channel?.thumbnail} alt={`${channel?.title}'s logo`}/>
                <span>{channel?.title}</span>
              </Link>
              <details id={'video-description'}>
                <summary>Description</summary>
                <pre>{video.description}</pre>
              </details>
            </section>
            <CommentSection/>
          </>
      )
}