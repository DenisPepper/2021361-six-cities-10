import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { comments } from './mocks/comments';
import { offers } from './mocks/offers';

const ROOMS = offers;
const COMMENTS = comments;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App rooms={ROOMS} comments={COMMENTS}/>
  </React.StrictMode>
);
