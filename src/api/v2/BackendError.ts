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

export class BackendError {

  public static NOT_FOUND = new BackendError('', 404, new Headers(), '', '', '');

  method: string;
  status: number;
  headers: Headers;
  url: string;
  reason: string;
  stackTrace?: string;


  constructor(method: string, status: number, header: Headers, url: string, reason: string, stackTrace: string) {
    this.method = method;
    this.status = status;
    this.headers = header;
    this.url = url;
    this.reason = reason;
    this.stackTrace = stackTrace;
  }
}