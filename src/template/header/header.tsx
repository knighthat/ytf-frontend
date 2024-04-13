import {IonIcon} from "@ionic/react";

import './header.scss'

import {SearchBar} from "../search/search";
import {useCallback} from "react";

const CHANGELOGS_URL = import.meta.env.VITE_CHANGELOGS_URL;

export default function Header() {

  const changeTheme = useCallback(() => {
    const root = document.getElementById('root')!;

    const classList = root.classList;
    if (classList.contains('theme-dark')) {
      classList.remove('theme-dark');
      classList.add('theme-light');
    } else {
      classList.remove('theme-light');
      classList.add('theme-dark');
    }
  }, []);

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
                <a className={'nav-item'} href='https://knighthat.me'>
                  <IonIcon size='large' icon="telescope"/>
                  <span>My website</span>
                </a>
              </li>
              <li>
                <a className={'nav-item'} onClick={changeTheme}>
                  <IonIcon size='large' icon="sunny-sharp"/>
                  <span>Theme</span>
                </a>
              </li>
              <li>
                <a className={'nav-item'} href={CHANGELOGS_URL}>
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