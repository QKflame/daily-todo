import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/common.scss';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Plan from './pages/Plan';
import './styles/antd-overwrite.scss';
import Login from './pages/Login';
import { App } from './App';
import Home from './pages/Home';
import { Provider, rootStore } from './models/Root';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider value={rootStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="plan" element={<Plan />}></Route>
            <Route path="home" element={<Home />}></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
