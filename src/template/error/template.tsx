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

import {BackendError} from "@api2/BackendError";
import NotFoundError from "@/template/error/404/notfound";
import InternalServerError from "@/template/error/50x/error";

export default function ErrorPage(_: { error: BackendError }) {
  return _.error.status === 404
      ? <NotFoundError/>
      : <InternalServerError error={_.error}/>
}