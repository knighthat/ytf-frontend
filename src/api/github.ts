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

export class GithubVersion {
  hash: string;
  date: Date;

  constructor(hash: string, date: Date) {
    this.hash = hash;
    this.date = date;
  }

  toString(): string {
    return `${this.toDateString()}-${this.hash.substring(0, 7)}`
  }

  private toDateString(): string {
    const twoDigits = (num: number) => num < 10 ? `0${num}` : `${num}`;
    const year = this.date.getFullYear(), month = this.date.getMonth(), day = this.date.getDay();
    return `${year}.${twoDigits(month)}.${twoDigits(day)}`
  }
}

export async function GetLatestCommit(): Promise<GithubVersion | null> {
  const url: string = import.meta.env.VITE_FETCH_COMMIT_URL;

  try {
    const request = await fetch(url);
    if (request.ok) {
      const data = (await request.json())[0];
      return new GithubVersion(data.sha, new Date(data.commit.author.date));
    }
  } catch (err) {
    console.log('Failed to fetch commit from URL: ' + url);
    console.log(err);
  }
  
  return null;
}