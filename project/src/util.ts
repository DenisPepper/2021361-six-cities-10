import React from 'react';
import { DECIMAL, RATING_COEF, DEFAULT_DELAY } from './settings';

export const converToPercent = (rating: number) => rating * RATING_COEF;

export const getInteger = (value: string | undefined) =>
  parseInt(String(value), DECIMAL);

type V = React.ChangeEvent<HTMLTextAreaElement>;
type C = (value: V) => void;
type T = ReturnType<typeof setTimeout>;

export const debounce = (callback: C, delay = DEFAULT_DELAY) => {
  let timeoutId: T;
  return (value: V) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(value), delay);
  };
};
