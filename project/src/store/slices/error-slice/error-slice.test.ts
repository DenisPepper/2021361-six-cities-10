import { errorSlice, setError } from './error-slice';

const reducer = errorSlice.reducer;

type StateType = {
  error: string | null;
};

const unknowCase = { type: 'UNKNOW_CASE' };

const defaultStore: StateType = {
  error: null,
};

describe('error-slice reducer', () => {
  it('when default case', () =>
    expect(reducer(undefined, unknowCase)).toEqual(defaultStore));

  it('when set error as string then success', () =>
    expect(reducer(defaultStore, setError('error-mesage-text'))).toEqual({
      error: 'error-mesage-text',
    }));
});
