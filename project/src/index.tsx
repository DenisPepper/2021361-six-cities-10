import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { comments } from './mocks/comments';
import { offers } from './mocks/offers';

const ROOMS = offers;
const COMMENTS = comments;
const MAP_SETTINGS = {
  latitude: 52.37454,
  longitude: 4.897976,
  zoom: 10,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App mapSettings={MAP_SETTINGS} rooms={ROOMS} comments={COMMENTS} />
  </React.StrictMode>
);
