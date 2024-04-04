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


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter>
        <Header/>
        <main id={'page-content'}>
          <Routes>
            <Route path={'/'} element={<Landing/>}/>
            <Route path={'/search'} element={<SearchPage/>}/>
            <Route path={'/licenses'} element={<Licenses/>}/>
          </Routes>
        </main>
        <Footer/>
      </BrowserRouter>
    </React.StrictMode>,
)
