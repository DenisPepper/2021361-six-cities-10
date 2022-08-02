import { combineReducers, configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';

const reducers = combineReducers({ reducer });

export const store = configureStore({
  reducer: reducers,
});
