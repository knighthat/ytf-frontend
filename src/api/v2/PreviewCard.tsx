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

import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {IonIcon} from "@ionic/react";

import InfoContainer, {DateTime, timeFromNow} from "./InfoContainer";
import {roundToMagnitude} from "../../utils/NumUtils";

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

function readableDuration(videoDuration: VideoDuration) {
  const twoDigits = (num: number) => num < 10 ? `0${num}` : `${num}`;
  return `${videoDuration.hours > 0 ? twoDigits(videoDuration.hours) + ':' : ''}${twoDigits(videoDuration.minutes)}:${twoDigits(videoDuration.seconds)}`
}


export abstract class PreviewCard extends InfoContainer {
  thumbnail: string;

  protected constructor(id: string, since: DateTime, thumbnail: string) {
    super(id, since);
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
    super(id, since, '');
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
    super(id, since, thumbnail);
    this.title = title;
    this.url = url;
  }
}

export function VideoCard(card: { video: VideoPreviewCard, channel?: ChannelPreviewCard }) {
  const video = card.video;
  const channel = card.channel;

  const [cUrl, setCUrl] = useState('');
  const [cTitle, setCTitle] = useState('Fetching...')
  const [cThumbnail, setCThumbnail] = useState('/icons/loading-profile-picture-32x32.webp')

  useEffect(() => {
    if (!channel)
      return;

    if (channel.url)
      setCUrl(channel.url);
    if (channel.title)
      setCTitle(channel.title);
    if (channel.thumbnail)
      setCThumbnail(channel.thumbnail);

  }, [channel]);

  function Stat(stat: { width: number, icon: string, text: string }) {
    return (
        <span className={`pure-u-1-${stat.width}`}>
          <IonIcon icon={stat.icon}/>
          {stat.text}
        </span>
    );
  }

  return (
      <Link className={"pure-u video-preview-card preview-card"} to={`/watch?v=${video.id}`}>
        <div className={"preview-thumbnail-container"}>
          <img
              src={`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`}
              srcSet={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
              className={"preview-thumbnail"}
              alt=""
          />
          <div className={"preview-duration-layout"}>
            <div className={"preview-duration"}>
              <span>{readableDuration(video.duration)}</span>
            </div>
          </div>
        </div>
        <div className={"preview-description-container"}>
          <h3>{video.title}</h3>
          <Link to={`/${cUrl}`} className={"pure-g preview-channel-section"}>
            <img className={"pure-u-1-4"}
                 src={cThumbnail}
                 alt=''
            />
            <span className={"pure-u-3-4"}>{cTitle}</span>
          </Link>
        </div>
        <div className={"pure-g preview-video-statistics-container"}>
          <Stat width={4} icon='thumbs-up-sharp' text={video.getLikesAsString()}/>
          <Stat width={4} icon='eye-sharp' text={video.getViewsAsString()}/>
          <Stat width={2} icon='time-sharp' text={timeFromNow(video.since.value)}/>
        </div>
      </Link>
  )
}

export function ChannelCard(card: { channel: ChannelPreviewCard }) {
  const channel = card.channel;
  return (
      <a className="channel-preview-card preview-card" href={`/${channel.url}`}>
        <div className="channel-thumbnail-wrapper">
          <img
              src={channel.thumbnail}
              className="channel-thumbnail"
              alt={channel.title + "'s logo"}
          />
        </div>
        <h3>{channel.title}</h3>
      </a>
  );
}