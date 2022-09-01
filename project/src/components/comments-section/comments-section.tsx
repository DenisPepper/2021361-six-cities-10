import { useAppSelector } from '../../hooks';
import { AuthorizationStatus, COMMENTS_MAX_COUNT } from '../../settings';
import CommentForm from '../comment-form/comment-form';
import CommentItem from '../comment-item/comment-item';
import { shallowEqual } from 'react-redux';
import { roomComments, authStatus } from '../../store/selectors/selectors';
import { generateKey, comparator } from '../../util';

type CommentFormProps = {
  id: number;
};

export default function CommentSection(props: CommentFormProps): JSX.Element {
  const { id } = props;
  const comments = useAppSelector(roomComments, shallowEqual);
  const authorized = useAppSelector(authStatus, shallowEqual) === AuthorizationStatus.Yes;

  return (
    <section className='property__reviews reviews'>
      <h2 className='reviews__title'>
        Reviews · <span className='reviews__amount'>{comments.length}</span>
      </h2>

      <ul className='reviews__list'>
        {comments
          .slice(0, COMMENTS_MAX_COUNT)
          .sort(comparator)
          .map((comment) => (
            <CommentItem key={generateKey(comment)} comment={comment} />
          ))}
      </ul>
      {authorized && <CommentForm id={id} />}
    </section>
  );
}
