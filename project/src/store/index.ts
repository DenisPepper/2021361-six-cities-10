import { combineReducers, configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';
import { createHTTPClient } from '../services/api';

const reducers = combineReducers({ reducer });

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk:{extraArgument: createHTTPClient()}}),
});
