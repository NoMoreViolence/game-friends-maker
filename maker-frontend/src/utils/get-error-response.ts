import { AxiosError } from 'axios';
import { HttpStatus } from '@models';

interface Error {
  message: string;
  status: number;
}

export const getErrorResponse = (e: AxiosError<{ error: Error }>) => {
  if (e.response) {
    return e.response.data;
  }
  return { error: { message: '', status: HttpStatus.URI_TOO_LONG } };
};
