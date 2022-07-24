import { CommentType } from '../../types/comment-type';
import CommentForm from '../comment-form/comment-form';
import CommentItem from '../comment-item/comment-item';

type CommentFormProps = {
  comments: CommentType[];
};

export default function CommentSection(props: CommentFormProps): JSX.Element {
  const { comments } = props;

  return (
    <section className='property__reviews reviews'>
      <h2 className='reviews__title'>
        Reviews · <span className='reviews__amount'>{comments.length}</span>
      </h2>

      <ul className='reviews__list'>
        {comments.map((comment, index) => (
          <CommentItem key={++index} comment={comment} />
        ))}
      </ul>

      <CommentForm />
    </section>
  );
}
