import {IonIcon} from "@ionic/react";

import './header.scss'

import {SearchBar} from "../search/search";

export default function Header() {
  return (
      <header>
        <div className={'pure-u-1-24 pure-u-xl-1-4'}></div>
        <div className={'pure-u-11-24 pure-u-xl-1-2'}>
          <SearchBar/>
        </div>
        <div className={'pure-u-1-2 pure-u-xl-1-4'}>
          <nav>
            <ul>
              <li>
                <a className={'nav-item'}>
                  <IonIcon size='large' icon="telescope"/>
                  <span>My website</span>
                </a>
              </li>
              <li>
                <a className={'nav-item'}>
                  <IonIcon size='large' icon="sunny-sharp"/>
                  <span>Theme</span>
                </a>
              </li>
              <li>
                <a className={'nav-item'}>
                  <IonIcon size='large' icon="clipboard-sharp"/>
                  <span>Changelogs</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
  )
}