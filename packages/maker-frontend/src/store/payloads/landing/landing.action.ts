export interface EmailSubscribePayload {
  email: string;
}
export interface EmailSubscribeSuccessPayload {
  result: 'success' | 'error';
  msg: string;
}
