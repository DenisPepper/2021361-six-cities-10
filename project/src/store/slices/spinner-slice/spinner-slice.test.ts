import { getOffer } from '../../action-creaters-middleware';
import { spinnerSlice, spinnerEnabled } from './spinner-slice';

const reducer = spinnerSlice.reducer;

const unknowCase = { type: 'UNKNOW_CASE' };

type StateType = {
  spinnerDisabled: boolean;
};

const defaultStore: StateType = {
  spinnerDisabled: false,
};

describe('offers-slice reducer', () => {
  it('when default case', () =>
    expect(reducer(undefined, unknowCase)).toEqual(defaultStore));

  it('when spinner enabled is success', () =>
    expect(reducer(defaultStore, spinnerEnabled())).toEqual({
      ...defaultStore,
    }));

  it('when get offer is success', () =>
    expect(reducer(defaultStore, { type: getOffer.fulfilled.type })).toEqual({
      spinnerDisabled: true,
    }));

  it('when get offer is fail', () =>
    expect(reducer(defaultStore, { type: getOffer.rejected.type })).toEqual({
      spinnerDisabled: true,
    }));
});
