import React from 'react'
import ReactDOM from 'react-dom/client'
import Main from './pages/Main/Main.tsx'
import './reset.scss'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from './pages/auth/Login/Login.tsx';
import Registration from './pages/auth/Registration/Registration.tsx';

const city = 'Rostov-on-Don'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main city={city} />} />
        <Route path='/sign-in' element={<Login city={city} />} />
        <Route path='/sign-up' element={<Registration city={city} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)