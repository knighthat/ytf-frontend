import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router-dom";

import './assets/css/global.css'
import './main.css'

import Header from "./template/header/header";
import Footer from "./template/footer/footer";
import Landing from "./template/landing/landing";
import SearchPage from "./template/search/search";
import Licenses from "./template/licenses/licenses";
import WatchPage from "./template/watch/video";


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

  console.log(rootElement!.classList)

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
            <Route path={'/'} element={<Landing/>}/>
            <Route path={'/search'} element={<SearchPage/>}/>
            <Route path={'/licenses'} element={<Licenses/>}/>
            <Route path={'/watch'} element={<WatchPage/>}/>
          </Routes>
        </main>
        <Footer/>
      </BrowserRouter>
    </React.StrictMode>,
)
