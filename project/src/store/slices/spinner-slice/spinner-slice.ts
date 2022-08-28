import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../settings';
import { getOffer } from '../../action-creaters-middleware';

type StateType = {
  spinnerDisabled: boolean;
};

const initialState: StateType = {
  spinnerDisabled: false,
};

export const spinnerSlice = createSlice({
  name: NameSpace.Spinner,
  initialState,
  reducers: {
    spinnerEnabled: (state) => {
      state.spinnerDisabled = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getOffer.fulfilled, (state) => {
        state.spinnerDisabled = true;
      })

      .addCase(getOffer.rejected, (state) => {
        state.spinnerDisabled = true;
      });
  },
});

export const { spinnerEnabled } = spinnerSlice.actions;
