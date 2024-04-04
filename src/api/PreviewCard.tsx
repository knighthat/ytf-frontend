import {IonIcon} from "@ionic/react";

export class DateTime {
  value: number;
  dateOnly: boolean;
  timeZoneShift: number;

  constructor(value: number, dateOnly: boolean, timeZoneShift: number) {
    this.value = value;
    this.dateOnly = dateOnly;
    this.timeZoneShift = timeZoneShift;
  }
}

export enum CardType {
  VIDEO = "VIDEO",
  CHANNEL = "CHANNEL"
}

export abstract class PreviewCard {
  id: string;
  type: CardType;
  thumbnail: string;
  since: DateTime

  protected constructor(id: string, type: CardType, thumbnail: string, since: DateTime) {
    this.id = id;
    this.type = type;
    this.thumbnail = thumbnail;
    this.since = since;
  }

  abstract toHtml(): JSX.Element
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

export class VideoPreviewCard extends PreviewCard {

  duration: VideoDuration;
  title: string;
  likes: number;
  views: number;
  publisher: ChannelPreviewCard;

  constructor(id: string, since: DateTime, duration: VideoDuration, title: string, likes: number, views: number, publisher: ChannelPreviewCard) {
    super(id, CardType.VIDEO, "", since);
    this.duration = duration;
    this.title = title;
    this.likes = likes;
    this.views = views;
    this.publisher = publisher;
  }

  override toHtml(): JSX.Element {
    return (
        <div key={this.id} className={"pure-u video-preview-card preview-card"}>
          <a className={"preview-thumbnail-container"} href={'https://youtube.com/watch?v=' + this.id}>
            <img
                className={"preview-thumbnail"}
                src={`https://i.ytimg.com/vi/${this.id}/hqdefault.jpg`}
                alt=""
            />
            <div className={"preview-duration-layout"}>
              <div className={"preview-duration"}>
                <span>{this.getDuration()}</span>
              </div>
            </div>
          </a>
          <div className={"preview-description-container"}>
            <a href={'https://youtube.com/watch?v=' + this.id}><h3>{this.title}</h3></a>
            <a href={"https://youtube.com/" + this.publisher.id} className={"pure-g preview-channel-section"}>
              <img className={"pure-u-1-4"}
                   src={this.publisher.thumbnail}
                   alt=''
              />
              <span className={"pure-u-3-4"}>{this.publisher.title}</span>
            </a>
          </div>
          <div className={"pure-g preview-video-statistics-container"}>
          <span className={"pure-u-1-4"}>
            <IonIcon name="thumbs-up-sharp"></IonIcon>
            {this.roundNumber(this.likes)}
          </span>
            <span className={"pure-u-1-4"}>
            <IonIcon name="eye-sharp"></IonIcon>
              {this.roundNumber(this.views)}
          </span>
            <span className={"pure-u-1-2"}>
            <IonIcon name="time-sharp"></IonIcon>
              {this.convertTime(this.since.value)}
          </span>
          </div>
        </div>
    )
  }

  private getDuration(): string {
    let result: string = ""

    const twoDigits = (num: number) => num < 10 ? `0${num}` : `${num}`;

    if (this.duration.hours > 0)
      result += twoDigits(this.duration.hours) + ":";
    result += twoDigits(this.duration.minutes) + ":";
    result += twoDigits(this.duration.seconds);

    return result;
  }

  private roundNumber(num: number): string {
    let rounded = num;
    const billion = 1000000000, million = 1000000, thousand = 1000;
    let unit = '';

    if (num >= billion) {
      rounded = Math.floor(num / billion);
      unit = "B";
    } else if (num >= million) {
      rounded = Math.floor(num / million);
      unit = "M";
    } else if (num >= thousand) {
      rounded = Math.floor(num / thousand);
      unit = 'K';
    }

    return rounded + unit;
  }

  private convertTime(unix_time: number): string {
    const now = new Date().getTime();
    const delta = Math.floor((now - unix_time) / 1000);

    let result = delta, unit: string;
    const year = 31556952, month = 2629746, day = 86400, hour = 3600, minute = 60

    if (delta >= year) {
      result = Math.floor(delta / year);
      unit = result > 1 ? "years" : "year"
    } else if (delta >= month) {
      result = Math.floor(delta / month);
      unit = result > 1 ? "months" : "month"
    } else if (delta >= day) {
      result = Math.floor(delta / day);
      unit = result > 1 ? "days" : "day";
    } else if (delta >= hour) {
      result = Math.floor(delta / hour);
      unit = result > 1 ? "hours" : "hour";
    } else if (delta >= minute) {
      result = Math.floor(delta / minute);
      unit = result > 1 ? "minutes" : "minute";
    } else {
      unit = result > 1 ? "seconds" : "second";
    }

    return result + " " + unit + " ago"
  }
}

export class ChannelPreviewCard extends PreviewCard {

  title: string

  constructor(id: string, thumbnail: string, since: DateTime, title: string) {
    super(id, CardType.CHANNEL, thumbnail, since);
    this.title = title;
  }

  override toHtml(): JSX.Element {
    return (
        <a className="channel-preview-card preview-card" href={"https://youtube.com/" + this.id}>
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