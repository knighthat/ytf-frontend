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

import {Link, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {GetVideo} from "../../api/v1/backend";
import {Comment, VideoPlayer} from "../../api/v1/VideoPlayer";
import {IonIcon} from "@ionic/react";

function CommentCard(comment: Comment, index: number) {
  return (
      <div key={index} id={'comment-card'}>
        <section className={'pure-g commenter-wrapper'}>
          <img src={comment.authorThumbnail} alt={`${comment.author}'s logo`} className={'comment-author'}/>
          <div>
            <h3>
              <Link to={`/${comment.author}`}>
                {comment.author}
              </Link>
            </h3>
            <sub className={'pure-u-1'}>{new Date(comment.since.value).toDateString()}</sub>
          </div>
          <div id='comment-statistics'>
            <IonIcon icon={'thumbs-up-outline'}/>
            <span>{comment.likes}</span>
          </div>
        </section>
        <section className={'comment-text'}>
          <article>
            <p>{comment.text}</p>
          </article>
        </section>
        <section className={'pure-g comment-statistics'}>

        </section>
      </div>
  )
}

export default function WatchPage() {
  const [params] = useSearchParams();
  const [video, setVideo] = useState<VideoPlayer>();
  useEffect(() => {
    const getVideo = async () => {
      const fromBackend = await GetVideo(params.get('v'));
      if (fromBackend)
        setVideo(fromBackend);
    }
    getVideo();

  }, [params, setVideo]);

  if (!video)
    return <></>

  return (
      <>
        <section id='player' className={'nice-alignment'}>
          <iframe
              src={`https://www.youtube.com/embed/${video.id}`}
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
          <Link to={`/${video.publisher.url}`} className={'channel-container'}>
            <img src={video.publisher.thumbnail} alt={`${video.publisher.title}'s logo`}/>
            <span>{video.publisher.title}</span>
          </Link>
          <details className={'video-description-container'}>
            <summary>Description</summary>
            <pre>
              <p>{video.description}</p>
            </pre>
          </details>
        </section>
        <div id={'comment-section'} className={'nice-alignment'}>
          <hr/>
          <h2>{video.commentCount} Comments</h2>
          <article>
            {
              video.comments.map((comment, index) => (
                  <CommentCard key={index}
                               id={comment.id}
                               text={comment.text}
                               author={comment.author}
                               authorThumbnail={comment.authorThumbnail}
                               likes={comment.likes}
                               since={comment.since}
                               replies={comment.replies}
                  />
              ))
            }
          </article>
        </div>
      </>

  )
}