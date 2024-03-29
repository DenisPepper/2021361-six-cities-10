import { store } from '../store';
import { setError } from '../store/slices/error-slice/error-slice';
import { clearError } from '../store/action-creaters-middleware';

export const AppErrorHandler = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(clearError());
};
