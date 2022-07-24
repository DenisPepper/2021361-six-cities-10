import React, { useState } from 'react';
import { CommentType } from '../../types/comment-type';

/* FIXME: user.id user.isPro, user.name, user.avatarUrl,  */
const getDefaultState = (id: number):CommentType =>
  ({
    id,
    user: {
      id: 12,
      isPro: false,
      name: 'UserName',
      avatarUrl: 'https://10.react.pages.academy/static/avatar/1.jpg',
    },
    rating: 0,
    comment:'text content',
    date: new Date().toISOString(),
  });

type CommentFormProps = {
  id: number;
};

export default function CommentForm(props: CommentFormProps): JSX.Element {
  const { id } = props;

  const [state, setState] = useState(getDefaultState(id));

  const onInputHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setState({ ...state, [name]: value });
  };

  const onChangeHandler = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    setState({ ...state, [name]: value });
  };

  return (
    <form className='reviews__form form' action='#' method='post'>
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
          onInput={onInputHandler}
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
          onInput={onInputHandler}
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
          onInput={onInputHandler}
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
          onInput={onInputHandler}
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
          onInput={onInputHandler}
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
        onInput={onChangeHandler}
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
          disabled
        >
          Submit
        </button>
      </div>
    </form>
  );
}
