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

import {ChannelPreviewCard, DateTime} from "./PreviewCard";

export class Comment {
  id: string;
  text: string;
  author: string;
  authorThumbnail: string;
  likes: number;
  since: DateTime;
  replies: Comment[]

  constructor(id: string, text: string, author: string, authorThumbnail: string, likes: number, since: DateTime, replies: Comment[]) {
    this.id = id;
    this.text = text;
    this.author = author;
    this.authorThumbnail = authorThumbnail;
    this.likes = likes;
    this.since = since;
    this.replies = replies;
  }
}

export class VideoPlayer {
  id: string;
  title: string;
  description: string;
  likes: number;
  views: number;
  since: DateTime;
  commentCount: number;
  comments: Comment[]
  publisher: ChannelPreviewCard

  constructor(id: string, title: string, description: string, likes: number, views: number, since: DateTime, commentCount: number, comments: Comment[], publisher: ChannelPreviewCard) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.likes = likes;
    this.views = views;
    this.since = since;
    this.commentCount = commentCount;
    this.comments = comments;
    this.publisher = publisher;
  }
}