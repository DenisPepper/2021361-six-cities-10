import { ServerRoutes } from '../settings';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { StateType } from '../types/state-type';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import {
  checkAuthorizationStatus,
  clearError,
  getFavorites,
  changeFavoriteStatus,
  getOffers,
} from './action-creaters-middleware';
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

  it('when getFavorites status is 200', async () => {
    const store = mockStore();
    HTTPClient.onGet(ServerRoutes.favorite).reply(200, []);
    expect(store.getActions()).toEqual([]);
    await store.dispatch(getFavorites());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      getFavorites.pending.type,
      getFavorites.fulfilled.type,
    ]);
  });

  it('when changeFavoriteStatus status is 200', async () => {
    const param = {id: 1, isFavorite: true };
    const store = mockStore();
    HTTPClient.onPost(`${ServerRoutes.favorite}/${param.id}/${1}`).reply(200, []);
    expect(store.getActions()).toEqual([]);
    await store.dispatch(changeFavoriteStatus(param));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      changeFavoriteStatus.pending.type,
      changeFavoriteStatus.fulfilled.type,
    ]);
  });

  it('when getOffers is 200', async () => {
    const store = mockStore();
    HTTPClient.onGet(ServerRoutes.hotels).reply(200, []);
    expect(store.getActions()).toEqual([]);
    await store.dispatch(getOffers());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([getOffers.pending.type, getOffers.fulfilled.type]);
  });

  it('when clearError is 200', async () => {
    const store = mockStore();
    expect(store.getActions()).toEqual([]);
    await store.dispatch(clearError());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      clearError.pending.type,
      clearError.fulfilled.type,
    ]);
  });
});
