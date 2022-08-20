import React, { useEffect, useState } from 'react';
import { getInteger, debounce } from '../../util';

type CommentFormProps = {
  id: number;
};

export default function CommentForm(props: CommentFormProps): JSX.Element {
  const { id } = props;
  const [state, setState] = useState({ rating: 0, comment: '' , isValid: false});

  useEffect(() => {
    const isValid = state.comment.length >= 50 && state.rating !== 0;
    if (isValid !== state.isValid) {
      setState({ ...state, isValid});
    }
  }, [state]);

  const onChangeInputHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setState(() => ({ ...state, [name]: getInteger(value) }));
  };

  const onChangeTextHandler = debounce(
    (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = evt.target;
      setState(() => ({ ...state, [name]: value }));
    }
  );

  const onSubmitHandler = (evt: React.SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className='reviews__form form'
      action='#'
      method='post'
    >
      <label className='reviews__label form__label' htmlFor='review'>
        Your review
      </label>

      <div className='reviews__rating-form form__rating'>
        <input
          className='form__rating-input visually-hidden'
          name='rating'
          defaultValue={5}
          id='5-stars'
          type='radio'
          onInput={onChangeInputHandler}
        />
        <label
          htmlFor='5-stars'
          className='reviews__rating-label form__rating-label'
          title='perfect'
        >
          <svg className='form__star-image' width={37} height={33}>
            <use xlinkHref='#icon-star' />
          </svg>
        </label>

        <input
          className='form__rating-input visually-hidden'
          name='rating'
          defaultValue={4}
          id='4-stars'
          type='radio'
          onInput={onChangeInputHandler}
        />
        <label
          htmlFor='4-stars'
          className='reviews__rating-label form__rating-label'
          title='good'
        >
          <svg className='form__star-image' width={37} height={33}>
            <use xlinkHref='#icon-star' />
          </svg>
        </label>

        <input
          className='form__rating-input visually-hidden'
          name='rating'
          defaultValue={3}
          id='3-stars'
          type='radio'
          onInput={onChangeInputHandler}
        />
        <label
          htmlFor='3-stars'
          className='reviews__rating-label form__rating-label'
          title='not bad'
        >
          <svg className='form__star-image' width={37} height={33}>
            <use xlinkHref='#icon-star' />
          </svg>
        </label>

        <input
          className='form__rating-input visually-hidden'
          name='rating'
          defaultValue={2}
          id='2-stars'
          type='radio'
          onInput={onChangeInputHandler}
        />
        <label
          htmlFor='2-stars'
          className='reviews__rating-label form__rating-label'
          title='badly'
        >
          <svg className='form__star-image' width={37} height={33}>
            <use xlinkHref='#icon-star' />
          </svg>
        </label>

        <input
          className='form__rating-input visually-hidden'
          name='rating'
          defaultValue={1}
          id='1-star'
          type='radio'
          onInput={onChangeInputHandler}
        />
        <label
          htmlFor='1-star'
          className='reviews__rating-label form__rating-label'
          title='terribly'
        >
          <svg className='form__star-image' width={37} height={33}>
            <use xlinkHref='#icon-star' />
          </svg>
        </label>
      </div>

      <textarea
        className='reviews__textarea form__textarea'
        id='review'
        name='comment'
        placeholder='Tell how was your stay, what you like and what can be improved'
        defaultValue={''}
        onInput={onChangeTextHandler}
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
          disabled = {!state.isValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
