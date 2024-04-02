import './header.css'
import {IonIcon} from "@ionic/react";

export default function Header() {
  return (
      <header>
        <div className={'pure-u-1-24 pure-u-xl-1-4'}></div>
        <div className={'pure-u-11-24 pure-u-xl-1-2 search-bar-alignment'}>
          <div className={'search-bar-container'}>
            <input id={'search-bar'} placeholder="Search"/>
            <hr/>
          </div>
        </div>
        <div className={'pure-u-1-2 pure-u-xl-1-4'}>
          <nav>
            <ul>
              <li>
                <a className={'nav-item'}>
                  <IonIcon size='large' name="telescope"></IonIcon>
                  <span>My website</span>
                </a>
              </li>
              <li>
                <a className={'nav-item'}>
                  <IonIcon size='large' name="sunny-sharp"></IonIcon>
                  <span>Theme</span>
                </a>
              </li>
              <li>
                <a className={'nav-item'}>
                  <IonIcon size='large' name="clipboard-sharp"></IonIcon>
                  <span>Changelogs</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
  )
}