import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const ROOMS_COUNT = 20;
const ROOMS = Array.from({length: ROOMS_COUNT}, (e, i) => ++i);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App placesCount = {ROOMS_COUNT} rooms = {ROOMS}/>
  </React.StrictMode>,
);
