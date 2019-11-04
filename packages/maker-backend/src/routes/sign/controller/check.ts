import { Request, Response } from 'express';
import { HttpStatusCode } from '@constants';
import { UserToken } from '@middlewares';
import { getErrorResponse } from '@helpers';

export const check = async (req: Request, res: Response) => {
  try {
    const {
      user: { name, email },
    }: UserToken = res.locals;

    res.status(HttpStatusCode.OK).json({
      status: HttpStatusCode.OK,
      message: 'Check success',
      value: {
        name,
        email,
      },
    });
  } catch (e) {
    const { status, message } = getErrorResponse(e);

    res.status(status).json({
      status,
      message,
    });
  }
};
