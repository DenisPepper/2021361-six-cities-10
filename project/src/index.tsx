import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { store } from './store';
import { CITIES } from './settings';
import ErrorMessage from './components/error/error';
import { getOffers, getFavorites, checkAuthorizationStatus } from './store/action-creaters-middleware';

store.dispatch(getOffers());
store.dispatch(getFavorites());
store.dispatch(checkAuthorizationStatus());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App cities={CITIES}/>
    </Provider>
  </React.StrictMode>
);
