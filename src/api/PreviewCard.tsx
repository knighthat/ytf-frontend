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

export default class PreviewCard {
  id: string;
  videoThumbnail: string;
  duration: number;
  videoTitle: string;
  channelUrl: string;
  channelTitle: string;
  channelThumbnail: string;
  likeCount: number;
  viewCount: number;
  uploadTime: DateTime;

  constructor(id: string, videoThumbnail: string, duration: number, videoTitle: string, channelUrl: string, channelTitle: string, channelThumbnail: string, likeCount: number, viewCount: number, uploadTime: DateTime) {
    this.id = id;
    this.videoThumbnail = videoThumbnail;
    this.duration = duration;
    this.videoTitle = videoTitle;
    this.channelUrl = channelUrl;
    this.channelTitle = channelTitle;
    this.channelThumbnail = channelThumbnail;
    this.likeCount = likeCount;
    this.viewCount = viewCount;
    this.uploadTime = uploadTime;
  }

  toHTML() {
    return (
        <div key={this.id} className={"video-preview-card pure-u"}>
          <a className={"preview-thumbnail-container"} href={'https://youtube.com/watch?v=' + this.id}>
            <img
                className={"preview-thumbnail"}
                src={this.videoThumbnail}
                alt=""
            />
            <div className={"preview-duration-layout"}>
              <div className={"preview-duration"}>
                <span>{this.convertDuration(this.duration)}</span>
              </div>
            </div>
          </a>
          <div className={"preview-description-container"}>
            <a href={'https://youtube.com/watch?v=' + this.id}><h3>{this.videoTitle}</h3></a>
            <a href={"https://youtube.com/" + this.channelUrl} className={"pure-g preview-channel-section"}>
              <img className={"pure-u-1-4"}
                   src={this.channelThumbnail}
                   alt=''
              />
              <span className={"pure-u-3-4"}>{this.channelTitle}</span>
            </a>
          </div>
          <div className={"pure-g preview-video-statistics-container"}>
            <span className={"pure-u-1-4"}>
              <IonIcon name="thumbs-up-sharp"></IonIcon>
              {this.roundNumber(this.likeCount)}
            </span>
            <span className={"pure-u-1-4"}>
              <IonIcon name="eye-sharp"></IonIcon>
              {this.roundNumber(this.viewCount)}
            </span>
            <span className={"pure-u-1-2"}>
              <IonIcon name="time-sharp"></IonIcon>
              {this.convertTime(this.uploadTime.value)}
            </span>
          </div>
        </div>
    )
  }

  private roundNumber(num: number) {
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

  private convertTime(unix_time: number) {
    const now = new Date().getTime();
    const delta = Math.floor((now - unix_time) / 1000);

    let result = delta;
    const year = 31556952, month = 2629746, day = 86400, hour = 3600, minute = 60
    let unit = ''

    if (delta >= year) {
      result = Math.floor(delta / year);
      unit = result > 1 ? "years" : "year"
    } else if (delta >= month) {
      result = Math.floor(delta / month);
      unit = result > 1 ? "months" : "month"
    } else if (delta >= day) {
      result = Math.floor(delta / day);
      unit = result > 1 ? "months" : "day"
    } else if (delta >= hour) {
      result = Math.floor(delta / hour);
      unit = result > 1 ? "months" : "hour"
    } else if (delta >= minute) {
      result = Math.floor(delta / minute);
      unit = result > 1 ? "months" : "minute"
    }

    return result + " " + unit + " ago"
  }

  private convertDuration(time: number) {
    let second = time, hour = 0, minute = 60;

    if (second >= 3600) {
      hour = Math.floor(second / 3600);
      second -= hour * 3600;
    }
    if (second >= 60) {
      minute = Math.floor(second / 60);
      second -= minute * 60;
    }

    let builder = hour > 0 ? (hour + ":") : ""
    builder += (minute >= 10 ? minute : "0" + minute) + ":"
    builder += (second >= 10 ? second : "0" + second)

    return builder
  }
}