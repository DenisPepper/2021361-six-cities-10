import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { setComment } from '../../store/action-creaters-middleware';
import { getInteger, debounce } from '../../util';
import CommentFormInputRating from '../comment-form-input-rating/comment-form-input-rating';

const RATINGS = [
  { value: 5, title: 'perfect' },
  { value: 4, title: 'good' },
  { value: 3, title: 'not bad' },
  { value: 2, title: 'badly' },
  { value: 1, title: 'terribly' },
];

type CommentFormProps = {
  id: number;
};

export default function CommentForm(props: CommentFormProps): JSX.Element {
  const { id } = props;
  const dispatch = useAppDispatch();
  const [state, setState] = useState({
    rating: 0,
    comment: '',
    isValid: false,
  });

  useEffect(() => {
    const isValid = state.comment.length >= 50 && state.rating !== 0;
    if (isValid !== state.isValid) {
      setState({ ...state, isValid });
    }
  }, [state]);

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setState(() => ({ ...state, [name]: getInteger(value) }));
  };

  const handleTextChange = debounce(
    (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = evt.target;
      setState(() => ({ ...state, [name]: value }));
    }
  );

  const handleFormSubmit = (evt: React.SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(
      setComment({
        id,
        comment: { rating: state.rating, comment: state.comment },
        form: evt.currentTarget,
      })
    );
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className='reviews__form form'
      action='#'
      method='post'
    >
      <label className='reviews__label form__label' htmlFor='review'>
        Your review
      </label>

      <div className='reviews__rating-form form__rating'>
        {RATINGS.map((rating) => (
          <CommentFormInputRating
            key={rating.value}
            onRatingInput={handleInputChange}
            title={rating.title}
            count={rating.value}
          />
        ))}
      </div>

      <textarea
        className='reviews__textarea form__textarea'
        id='review'
        name='comment'
        placeholder='Tell how was your stay, what you like and what can be improved'
        defaultValue={''}
        onInput={handleTextChange}
      />

      <div className='reviews__button-wrapper'>
        <p className='reviews__help'>
          To submit review please make sure to set{' '}
          <span className='reviews__star'>rating</span> and describe your stay
          with at least <b className='reviews__text-amount'>50 characters</b>.
        </p>
        <button
          className='reviews__submit form__submit button'
          type='submit'
          disabled={!state.isValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
