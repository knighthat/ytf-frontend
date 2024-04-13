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

import {IonIcon} from "@ionic/react";
import {Link} from "react-router-dom";

import './error.scss'

import {BackendError} from "@api2/BackendError";
import {MouseEvent} from "react";


export default function InternalServerError(_: { error: BackendError }) {
  const instance = _.error;

  async function CopyStackTrace(event: MouseEvent) {
    const target = event.target;
    if (!(target instanceof HTMLElement))
      return

    const textToCopy = document.getElementById('stack-trace-text')!.textContent;
    if (!textToCopy)
      return;

    await navigator.clipboard.writeText(textToCopy)

    const icon = target.getAttribute('icon');
    target.setAttribute('icon', 'checkmark');
    setTimeout(() => target.setAttribute('icon', icon!), 2000);
  }

  const headers = () => {
    const iterators = instance.headers.entries();

    let result = '';
    for (const [key, value] of iterators)
      result += `\n\t${key}: ${value},`

    return `\n[${result}\n]`;
  }

  return (
      <>
        <section id='error-message' className={'nice-alignment'}>
          <p className={'pure-g'}>
            <span className={'pure-u-1'}>Looks like something has happened to the backend!</span>
            <span className={'pure-u-1'}>
              <IonIcon icon='caret-forward-outline'/>
              {instance.reason}
              <IonIcon icon='caret-back-outline'/>
            </span>
          </p>
        </section>
        <section id='possible-actions' className={'pure-menu pure-menu-horizontal'}>
          <hr/>
          <ul className={'pure-menu-list'}>
            <li className={'pure-menu-item'}>
              <button onClick={location.reload}>
                <IonIcon icon='reload-circle' className={'icon-mr-5'}/>
                Reload page
              </button>
            </li>
            <li className={'pure-menu-item'}>
              <Link to={'/'}>
                <IonIcon icon='home' className={'icon-mr-5'}/>
                Go to Homepage
              </Link>
            </li>
            <li className={'pure-menu-item'}>
              <button>
                <IonIcon icon='ticket' className={'icon-mr-5'}/>
                Report this issue
              </button>
            </li>
          </ul>
          <hr/>
        </section>
        <section id='stack-trace' className={'nice-alignment'}>
          <div className={'stack-trace-header'}>
            <span>Stack Trace - Include this in the report</span>
            <IonIcon icon='copy' id='copy-button' onClick={CopyStackTrace}/>
          </div>
          <pre id='stack-trace-instance.text' className={'pure-g'}>
            <span className={'pure-u-1'}>{instance.method} {instance.url}</span>
            <span className={'pure-u-1'}>Status: {instance.status}</span>
            <span className={'pure-u-1'}>Headers: {headers()}</span>
            <span className={'pure-u-1'}>Reason: {instance.reason}</span>
            <br/>
            <p>{instance.stackTrace}</p>
          </pre>
        </section>
      </>
  )
}