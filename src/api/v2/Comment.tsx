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

import InfoContainer, {DateTime} from "./InfoContainer";
import {Link} from "react-router-dom";
import {IonIcon} from "@ionic/react";

export default class Comment extends InfoContainer {

  videoId: string;
  text: string;
  author: string;
  authorThumbnail: string;
  likes: number;
  replies: Comment[]

  constructor(id: string, since: DateTime, videoId: string, text: string, author: string, authorThumbnail: string, likes: number, replies: Comment[]) {
    super(id, since);
    this.videoId = videoId;
    this.text = text;
    this.author = author;
    this.authorThumbnail = authorThumbnail;
    this.likes = likes;
    this.replies = replies;
  }
}

export function CommentCard(props: { comment: Comment }): JSX.Element {
  const comment = props.comment;
  return (
      <div id={'comment-card'}>
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
      </div>
  )
}