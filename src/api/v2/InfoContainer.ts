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

export default abstract class InfoContainer {

  id: string;
  since: DateTime;

  protected constructor(id: string, since: DateTime) {
    this.id = id;
    this.since = since;
  }
}

export function timeFromNow(unix_time: number): string {
  const now = new Date().getTime();
  const delta = Math.floor((now - unix_time) / 1000);

  let result = delta, unit = 'seconds';
  const year = 31556952, month = 2629746, day = 86400, hour = 3600, minute = 60;

  if (delta >= year) {
    result = Math.floor(delta / year);
    unit = 'year';
  } else if (delta >= month) {
    result = Math.floor(delta / month);
    unit = 'month';
  } else if (delta >= day) {
    result = Math.floor(delta / day);
    unit = 'day';
  } else if (delta >= hour) {
    result = Math.floor(delta / hour);
    unit = 'hour'
  } else if (delta >= minute) {
    result = Math.floor(delta / minute);
    unit = 'minute';
  }

  /* Add 's' if it's plural */
  unit += result > 1 ? "s" : "";

  return result + " " + unit + " ago"
}