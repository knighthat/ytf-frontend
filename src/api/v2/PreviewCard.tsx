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

export enum CardType {
  VIDEO = "VIDEO",
  CHANNEL = "CHANNEL"
}

export class VideoDuration {
  hours: number;
  minutes: number;
  seconds: number;

  constructor(hours: number, minutes: number, seconds: number) {
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }
}

export function readableDuration(videoDuration: VideoDuration) {
  const twoDigits = (num: number) => num < 10 ? `0${num}` : `${num}`;
  return `${videoDuration.hours > 0 ? twoDigits(videoDuration.hours) + ':' : ''}${twoDigits(videoDuration.minutes)}:${twoDigits(videoDuration.seconds)}`
}


export abstract class PreviewCard extends InfoContainer {
  type: CardType;
  thumbnail: string;

  protected constructor(id: string, since: DateTime, type: CardType, thumbnail: string) {
    super(id, since);
    this.type = type;
    this.thumbnail = thumbnail;
  }
}

export class VideoPreviewCard extends PreviewCard {

  duration: VideoDuration;
  title: string;
  likes: number;
  views: number;
  publisherId: string;

  constructor(id: string, since: DateTime, duration: VideoDuration, title: string, likes: number, views: number, publisherId: string) {
    super(id, since, CardType.VIDEO, '');
    this.duration = duration;
    this.title = title;
    this.likes = likes;
    this.views = views;
    this.publisherId = publisherId;
  }

  getLikesAsString(): string {
    return roundToMagnitude(this.likes);
  }

  getViewsAsString(): string {
    return roundToMagnitude(this.views);
  }
}

export class ChannelPreviewCard extends PreviewCard {

  title: string
  url: string

  constructor(id: string, thumbnail: string, since: DateTime, title: string, url: string) {
    super(id, since, CardType.CHANNEL, thumbnail);
    this.title = title;
    this.url = url;
  }

  toHtml(): JSX.Element {
    return (
        <a className="channel-preview-card preview-card" href={`/${this.url}`}>
          <div className="channel-thumbnail-wrapper">
            <img
                src={this.thumbnail}
                className="channel-thumbnail"
                alt={this.title + "'s logo"}
            />
          </div>
          <h3>{this.title}</h3>
        </a>
    );
  }
}