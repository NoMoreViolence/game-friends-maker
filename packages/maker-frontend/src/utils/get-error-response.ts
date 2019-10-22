import { AxiosError } from 'axios';
import { HttpStatus } from '@models';

interface Error {
  message: string;
  status: number;
}

export const getErrorResponse = (e: AxiosError<Error>) =>
  e.response
    ? {
        ...e.response.data,
        error: true,
      }
    : {
        message: '',
        status: HttpStatus.URI_TOO_LONG,
        error: true,
      };
