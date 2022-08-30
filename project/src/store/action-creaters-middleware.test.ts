import { ServerRoutes } from '../settings';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { StateType } from '../types/state-type';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { checkAuthorizationStatus } from './action-creaters-middleware';
import axios from 'axios';

describe('async thunk actions', () => {
  const axiosInstance = axios.create();
  const HTTPClient = new MockAdapter(axiosInstance);
  const middlewares = [thunk.withExtraArgument(axiosInstance)];
  const mockStore = configureMockStore<
    StateType,
    Action,
    ThunkDispatch<StateType, typeof axiosInstance, Action>
  >(middlewares);

  it('when check auth status is 200', async () => {
    const store = mockStore();
    HTTPClient.onGet(ServerRoutes.login).reply(200, []);
    expect(store.getActions()).toEqual([]);
    await store.dispatch(checkAuthorizationStatus());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      checkAuthorizationStatus.pending.type,
      checkAuthorizationStatus.fulfilled.type,
    ]);
  });


});
