import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '@constants';
import { NewError, decodeToken, getErrorResponse } from '@helpers';

export const tokenCheckMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new NewError(HttpStatusCode.UNAUTHORIZED);
    }

    const execptBearerString = token.slice(0, 6);
    if (execptBearerString !== 'Bearer') {
      throw new NewError(HttpStatusCode.UNAUTHORIZED);
    }

    const decoded = decodeToken(token.slice(7, token.length));

    res.locals = decoded;
    return next();
  } catch (e) {
    const { message, status } = getErrorResponse(e);

    return res.status(status).json({ status, message });
  }
};
