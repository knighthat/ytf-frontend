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

import {Link} from "react-router-dom";
import {IonIcon} from "@ionic/react";

import './notfound.scss'

export default function NotFoundError() {
  return (
      <div id="notfound">
        <h1 id={'error-code'}>404</h1>
        <h2 id={'error-message'}>Oops, The Page you are looking for can't be found!</h2>
        <form id="notfound-search-form" action='/search' className={'pure-g'}>
          <input placeholder="Search" type="text" name='key' className={'pure-u-3-4'}/>
          <button type="submit" className={'pure-u-1-4'}>Search</button>
        </form>
        <Link to='/'>
          <IonIcon icon='chevron-back-outline' className={'icon-mr-5'}/>
          <span>Return To Homepage</span>
        </Link>
      </div>
  )
}