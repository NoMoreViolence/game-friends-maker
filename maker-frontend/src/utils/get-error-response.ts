import { AxiosError } from 'axios';
import { HttpStatus } from '@models';

interface Error {
  message: string;
  status: number;
}

export const getErrorResponse = (e: AxiosError<{ message: string; status: number }>) => {
  if (e.response) {
    return e.response.data;
  }
  return { message: '', status: HttpStatus.URI_TOO_LONG };
};
