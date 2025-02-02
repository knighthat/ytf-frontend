import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import './main.scss'

import Header from "./template/header/header";
import Footer from "./template/footer/footer";
import Landing from "./template/landing/landing";
import SearchPage from "./template/search/search";
import Licenses from "./template/licenses/licenses";
import WatchPage from "./template/watch/video";
import ChannelPage from "./template/channel/channel";
import {VerifyChannelId, VerifySearchKey, VerifyWatchId} from "./assets/ts/paths";


const rootElement = document.getElementById('root');

// Set default theme based on system's theme
const themeMedia = window.matchMedia('(prefers-color-scheme: dark)');
const [dark, light] = ['theme-dark', 'theme-light'];

function applyTheme(isDarkMode: boolean) {
  let remove: string, add: string;
  if (isDarkMode) {
    remove = light;
    add = dark;
  } else {
    remove = dark;
    add = light;
  }

  rootElement!.classList.remove(remove);
  rootElement!.classList.add(add);
}

applyTheme(themeMedia.matches);
// Listen to 'change' and apply appropriate theme
themeMedia.addEventListener(
    'change',
    (event) => applyTheme(event.matches)
);

const widthMedia = window.matchMedia('(max-width: 1280px)');
const [small, big] = ['small-screen', 'big-screen'];

function applyScreenType(isSmallScreen: boolean) {
  let remove: string, add: string;
  if (isSmallScreen) {
    remove = big;
    add = small;
  } else {
    remove = small;
    add = big;
  }

  rootElement!.classList.remove(remove);
  rootElement!.classList.add(add);
}

applyScreenType(widthMedia.matches)
// Listen to 'change' and apply appropriate screen type
widthMedia.addEventListener(
    'change',
    () => applyScreenType(widthMedia.matches)
);

ReactDOM.createRoot(rootElement!).render(
    <React.StrictMode>
      <BrowserRouter>
        <Header/>
        <main id={'page-content'}>
          <Routes>
            <Route path={'*'} element={<Navigate to={'/'}/>}/>
            <Route path={'/'} element={<Landing/>}/>
            <Route element={<VerifySearchKey/>}>
              <Route path={'/search'} element={<SearchPage/>}/>
            </Route>
            <Route path={'/licenses'} element={<Licenses/>}/>
            <Route element={<VerifyWatchId/>}>
              <Route path={'/watch'} element={<WatchPage/>}/>
            </Route>
            <Route element={<VerifyChannelId/>}>
              <Route path={'/channel/:channelId'} element={<ChannelPage/>}/>
              <Route path={'/:channelId'} element={<ChannelPage/>}/>
            </Route>
          </Routes>
        </main>
        <Footer/>
      </BrowserRouter>
    </React.StrictMode>
)

window.addEventListener('DOMContentLoaded', () => {
  function tagHeight(tagName: string): number {
    return document.getElementsByTagName(tagName)[0].clientHeight;
  }

  const pageContent = document.getElementById('page-content');
  const headerHeight = tagHeight('header');
  const footerHeight = tagHeight('footer');

  pageContent!.style.minHeight = `calc(100svh - ${headerHeight}px - ${footerHeight}px - 2px)`;
})