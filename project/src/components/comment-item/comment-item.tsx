import { CommentType } from '../../types/comment-type';
import { converToPercent } from '../../util';

type CommentItemProps = {
  comment: CommentType;
};

export default function CommentItem(props: CommentItemProps): JSX.Element {
  const { comment } = props;
  return (
    <li className='reviews__item'>
      <div className='reviews__user user'>
        <div className='reviews__avatar-wrapper user__avatar-wrapper'>
          <img
            className='reviews__avatar user__avatar'
            src={comment.user.avatarUrl}
            width={54}
            height={54}
            alt='Reviews avatar'
          />
        </div>
        <span className='reviews__user-name'>{comment.user.name}</span>
      </div>
      <div className='reviews__info'>
        <div className='reviews__rating rating'>
          <div className='reviews__stars rating__stars'>
            <span style={{ width: `${converToPercent(comment.rating)}%` }} />
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <p className='reviews__text'>{comment.comment}</p>
        <time className='reviews__time' dateTime={comment.date}>
          {/* FIXME: format data to <April 2019> */}
          {comment.date}
        </time>
      </div>
    </li>
  );
}
