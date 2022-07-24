import { CommentType } from '../types/comment-type';

const commentOne = {
  id: 1,
  user: {
    id: 12,
    isPro: true,
    name: 'Isaac',
    avatarUrl: 'https://10.react.pages.academy/static/avatar/3.jpg',
  },
  rating: 4,
  comment:
    'We loved it so much, the house, the veiw, the location just great.. Highly reccomend :)',
  date: '2022-06-13T12:25:36.938Z',
};

const commentTwo = {
  id: 1,
  user: {
    id: 18,
    isPro: true,
    name: 'Sophie',
    avatarUrl: 'https://10.react.pages.academy/static/avatar/9.jpg',
  },
  rating: 5,
  comment: 'I stayed here for one night and it was an unpleasant experience.',
  date: '2022-05-25T12:25:36.939Z',
};

export const comments: CommentType[] = [commentOne, commentTwo];
