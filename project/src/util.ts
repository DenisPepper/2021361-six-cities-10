import { DECIMAL, RATING_COEF } from './settings';

export const converToPercent = (rating: number) => rating * RATING_COEF;

export const getInteger = (value: string | undefined) => parseInt(String(value), DECIMAL);
