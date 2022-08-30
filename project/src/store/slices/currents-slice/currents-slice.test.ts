import { currentSlice, setCurrentCity, setCurrentID, setCurrentSort } from './currents-slice';

const reducer = currentSlice.reducer;

const unknowCase = { type: 'UNKNOW_CASE' };

const defaultStore = {
  currentcity: 'Paris',
  currentID: NaN,
  currentSort: 'Popular',
};

describe('current-slice reducer', () => {
  it('when default case', () =>
    expect(reducer(undefined, unknowCase)).toEqual(defaultStore));

  it('when set current city as string then success', () =>
    expect(reducer(defaultStore, setCurrentCity('someCity'))).toEqual({
      currentcity: 'someCity',
      currentID: NaN,
      currentSort: 'Popular',
    }));

  it('when set current ID as number then success', () => expect(reducer(defaultStore, setCurrentID(5))).toEqual({
    currentcity: 'Paris',
    currentID: 5,
    currentSort: 'Popular',
  }));

  it('when set current sort as string then success', () => expect(reducer(defaultStore, setCurrentSort('someSort'))).toEqual({
    currentcity: 'Paris',
    currentID: NaN,
    currentSort: 'someSort',
  }));

});

