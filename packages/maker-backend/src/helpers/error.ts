import { getStatusText } from 'http-status-codes';

export interface ErrorReturn {
  status: number;
  message: string;
}

export class NewError {
  public status = 200;
  public message = '';

  constructor(status: number) {
    this.status = status;
    this.message = getStatusText(status);
  }
}
