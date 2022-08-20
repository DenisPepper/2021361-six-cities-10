import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../settings';
import { CommentType } from '../../types/comment-type';
import CommentForm from '../comment-form/comment-form';
import CommentItem from '../comment-item/comment-item';

type CommentFormProps = {
  id: number
};

const generateKey = (comment: CommentType): string => `${comment.id}${comment.user.id}${comment.date}`;

export default function CommentSection(props: CommentFormProps): JSX.Element {
  const { id } = props;
  const comments = useAppSelector((state) => state.reducer.comments);
  const authorized = useAppSelector((state) => state.reducer.authorizationStatus) === AuthorizationStatus.Yes;

  return (
    <section className='property__reviews reviews'>
      <h2 className='reviews__title'>
        Reviews · <span className='reviews__amount'>{comments.length}</span>
      </h2>

      <ul className='reviews__list'>
        {comments.map((comment) => (
          <CommentItem key={generateKey(comment)} comment={comment} />
        ))}
      </ul>
      {authorized && <CommentForm id={id}/>}
    </section>
  );
}
