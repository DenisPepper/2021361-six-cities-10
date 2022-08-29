import {
  currentSlice,
} from './currents-slice';

const unknowCase = { type: 'UNKNOW_CASE' };
const defaultStore = {
  currentcity: 'Paris',
  currentID: NaN,
  currentSort: 'Popular',
};

describe('reducer at currentSlice', () => {
  it('when default case', () => {
    expect(currentSlice.reducer(undefined, unknowCase)).toEqual(defaultStore);
  });
});
