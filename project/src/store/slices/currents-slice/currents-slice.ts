import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, DEFAULT_CITY, DEFAULT_SORT } from '../../../settings';

type StateType = {
  currentcity: string;
  currentID: number;
  currentSort: string;
};

const initialState: StateType = {
  currentcity: DEFAULT_CITY,
  currentID: NaN,
  currentSort: DEFAULT_SORT,
};

export const currentSlice = createSlice({
  name: NameSpace.Current,
  initialState,
  reducers: {
    setCurrentCity: (state, action) => {
      state.currentcity = action.payload;
    },
    setCurrentSort: (state, action) => {
      state.currentSort = action.payload;
    },
    setCurrentID: (state, action) => {
      state.currentID = action.payload;
    },
  },
});

export const { setCurrentCity, setCurrentSort, setCurrentID } =
  currentSlice.actions;
