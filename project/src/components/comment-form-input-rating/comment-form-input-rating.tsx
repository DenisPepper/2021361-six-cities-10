import React from 'react';

type RatingProps = {
  onRatingInput: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  count: number;
};

export default function CommentFormInputRating(
  props: RatingProps
): JSX.Element {
  const { onRatingInput, title, count } = props;
  return (
    <React.Fragment>
      <input
        className='form__rating-input visually-hidden'
        name='rating'
        defaultValue={count}
        id={`${count}-star`}
        type='radio'
        onInput={onRatingInput}
      />
      <label
        htmlFor={`${count}-star`}
        className='reviews__rating-label form__rating-label'
        title={title}
      >
        <svg className='form__star-image' width={37} height={33}>
          <use xlinkHref='#icon-star' />
        </svg>
      </label>
    </React.Fragment>
  );
}
