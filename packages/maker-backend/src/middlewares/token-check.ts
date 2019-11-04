import { Request, Response, NextFunction } from 'express';
import { ObjectID } from 'mongodb';
import { HttpStatusCode } from '@constants';
import { UserModel } from '@common-server';
import { NewError, decodeToken, getErrorResponse, Decoded } from '@helpers';

export interface UserToken {
  decoded: Decoded;
  user: {
    _id: ObjectID;
    name: string;
    email: string;
    posts: ObjectID[];
  };
}

export const tokenCheckMiddleware = async (req: Request, res: Response, next: NextFunction) => {
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
    const user = await UserModel.findOne({ userTokenId: decoded.data._id }).exec();
    if (!user || user.deleted) {
      throw new NewError(HttpStatusCode.UNAUTHORIZED);
    }

    res.locals = {
      decoded,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        posts: user.posts,
      },
    };
    next();
  } catch (e) {
    const { status, message } = getErrorResponse(e);

    res.status(status).json({
      status,
      message,
    });
  }
};
