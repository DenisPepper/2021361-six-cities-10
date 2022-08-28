import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../settings';
import { authSlice } from './slices/auth-slice/auth-slice';
import { commentsSlice } from './slices/comments-slice/comments-slice';
import { currentSlice } from './slices/currents-slice/currents-slice';
import { favoriteSlice } from './slices/favorites-slice/favotite-slice';
import { offersSlice } from './slices/offers-slice/offers-slice';
import { spinnerSlice } from './slices/spinner-slice/spinner-slice';
import { errorSlice } from './slices/error-slice/error-slice';

export const rootReducer = combineReducers({
  [NameSpace.Auth]: authSlice.reducer,
  [NameSpace.Comments]: commentsSlice.reducer,
  [NameSpace.Current]: currentSlice.reducer,
  [NameSpace.Favorites]: favoriteSlice.reducer,
  [NameSpace.Offers]: offersSlice.reducer,
  [NameSpace.Spinner]: spinnerSlice.reducer,
  [NameSpace.Error]: errorSlice.reducer,
});
