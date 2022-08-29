import { getOffer, setComment } from '../../action-creaters-middleware';
import { commentsSlice } from './comments-slice';
import { CommentType } from '../../../types/comment-type';

const reducer = commentsSlice.reducer;

type StateType = {
  comments: CommentType[];
};

const defaultStore: StateType = {
  comments: [],
};

const comments: CommentType[] = [
  {
    comment:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: 'Mon Aug 29 2022 14:54:21 GMT+0300 (Москва, стандартное время)',
    id: 1,
    rating: 4,
    user: {
      avatarUrl: 'img/1.png',
      id: 1,
      isPro: false,
      name: 'Oliver.conner',
    },
  },
];

describe('comment-slice reducer', () => {
  it('when set comment is succes', () =>
    expect(
      reducer(defaultStore, {
        type: setComment.fulfilled.type,
        payload: comments,
      })
    ).toEqual({ comments }));

  it('when get offer is success', () =>
    expect(
      reducer(defaultStore, {
        type: getOffer.fulfilled.type,
        payload: { comments },
      })
    ).toEqual({ comments }));

  it('when get offer is fail', () =>
    expect(
      reducer(defaultStore, {
        type: getOffer.rejected.type,
      })
    ).toEqual({ comments: [] }));
});
