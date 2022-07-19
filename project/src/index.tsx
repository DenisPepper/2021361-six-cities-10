import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offers } from './mocks/offers';

const ROOMS = offers;
const ROOMS_COUNT = offers.length;


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App placesCount={ROOMS_COUNT} rooms={ROOMS} />
  </React.StrictMode>
);
