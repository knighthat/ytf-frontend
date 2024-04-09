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

import {ChannelPreviewCard, VideoDuration, VideoPreviewCard} from "./PreviewCard";
import {DateTime} from "./InfoContainer";

export class VideoDetails extends VideoPreviewCard {

  description: string;
  commentCount: number;

  constructor(id: string, since: DateTime, duration: VideoDuration, title: string, likes: number, views: number, publisherId: string, description: string, commentCount: number) {
    super(id, since, duration, title, likes, views, publisherId);
    this.description = description;
    this.commentCount = commentCount;
  }
}

export class ChannelDetails extends ChannelPreviewCard {

  subscribers: number;
  banner: string;
  views: number;
  description: string;


  constructor(id: string, thumbnail: string, since: DateTime, title: string, url: string, subscribers: number, banner: string, views: number, description: string) {
    super(id, thumbnail, since, title, url);
    this.subscribers = subscribers;
    this.banner = banner;
    this.views = views;
    this.description = description;
  }
}