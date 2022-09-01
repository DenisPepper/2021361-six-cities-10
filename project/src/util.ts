import React from 'react';
import { DECIMAL, RATING_COEF, Timeouts } from './settings';
import dayjs from 'dayjs';

export const converToPercent = (rating: number) => rating * RATING_COEF;

export const getInteger = (value: string | undefined) =>
  parseInt(String(value), DECIMAL);

type V = React.ChangeEvent<HTMLTextAreaElement>;
type C = (value: V) => void;
type T = ReturnType<typeof setTimeout>;

export const debounce = (callback: C, delay = Timeouts.Debounce) => {
  let timeoutId: T;
  return (value: V) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(value), delay);
  };
};

export const getRandomInteger = (min: number, max: number): number => {
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new Error('one of the params is not an integer');
  }
  if (min < 0 || max <= min) {
    throw new Error(
      'params do not meet the conditions: min, max > 0, max > min'
    );
  }
  return min + Math.floor(Math.random() * (max - min + 1));
};

export const formatDate = (date: string) => dayjs(date).format('MMMM YYYY');
