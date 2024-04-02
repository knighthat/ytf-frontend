import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router-dom";

import './assets/css/global.css'
import './main.css'

import Header from "./template/header/header";
import Footer from "./template/footer/footer";
import Landing from "./template/landing/landing";


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Header/>
      <main id={'page-content'}>
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<Landing/>}/>
          </Routes>
        </BrowserRouter>
      </main>
      <Footer/>
    </React.StrictMode>,
)
