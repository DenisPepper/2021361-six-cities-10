import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../settings';

type StateType = {
  error: string | null;
};

const initialState: StateType = {
  error: null,
};

export const errorSlice = createSlice({
  name: NameSpace.Error,
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setError } = errorSlice.actions;
