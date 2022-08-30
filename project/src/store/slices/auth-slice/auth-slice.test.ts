import { AuthorizationStatus } from '../../../settings';
import {
  checkAuthorizationStatus,
  login,
  logout,
} from '../../action-creaters-middleware';
import { authSlice } from './auth-slice';

const reducer = authSlice.reducer;

const unknowCase = { type: 'UNKNOW_CASE' };

const defaultStore = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userName: '',
};

const authorizedStore = {
  authorizationStatus: AuthorizationStatus.Yes,
  userName: 'user-email',
};

describe('auth-slice reducer', () => {
  it('when unknow case', () =>
    expect(reducer(undefined, unknowCase)).toEqual(defaultStore));

  it('when check auth is success', () =>
    expect(
      reducer(defaultStore, {
        type: checkAuthorizationStatus.fulfilled.type,
        payload: { email: 'user-email' },
      })
    ).toEqual({
      authorizationStatus: AuthorizationStatus.Yes,
      userName: 'user-email',
    }));

  it('when check auth is fail', () =>
    expect(
      reducer(defaultStore, {
        type: checkAuthorizationStatus.rejected.type,
      })
    ).toEqual({
      authorizationStatus: AuthorizationStatus.No,
      userName: '',
    }));

  it('when login is success', () =>
    expect(
      reducer(defaultStore, {
        type: login.fulfilled.type,
        payload: 'user-email',
      })
    ).toEqual({
      authorizationStatus: AuthorizationStatus.Yes,
      userName: 'user-email',
    }));

  it('when logout is success', () =>
    expect(
      reducer(authorizedStore, {
        type: logout.fulfilled.type,
      })
    ).toEqual({
      authorizationStatus: AuthorizationStatus.No,
      userName: '',
    }));
});
