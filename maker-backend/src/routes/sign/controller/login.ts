import { Request, Response } from 'express';
import { HttpStatusCode } from '@constants';
import { NewError, getErrorResponse } from '@helpers';

export const login = async (req: Request, res: Response) => {
  try {
    throw new NewError(30000);
  } catch (e) {
    const { status, message } = getErrorResponse(e);

    res.status(status).json({
      status,
      message,
    });
  }
};
