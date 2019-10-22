import { NewError, ErrorReturn } from '@helpers';

export const getErrorResponse = (e: unknown): ErrorReturn => {
  if (e instanceof NewError) {
    return e;
  } else {
    return { status: 500, message: 'Internal server error.' };
  }
};
