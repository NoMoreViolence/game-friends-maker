import { Request, Response } from 'express';
import { getMongoManager } from 'typeorm';
import * as Joi from '@hapi/joi';
import { HttpStatusCode } from '@constants';
import { User } from '@models';
import { NewError, getErrorResponse, checkGoogleIdToken, encodeToken } from '@helpers';

interface LoginPayload {
  name: string;
  email: string;
  googleId: string;
  googleIdToken: string;
}

const body = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  googleId: Joi.string(),
  googleIdToken: Joi.string(),
});

export const login = async (req: Request, res: Response) => {
  try {
    const userRepo = getMongoManager().getRepository(User);

    const { error, value } = body.validate(req.body as LoginPayload);
    if (error) {
      throw new NewError(HttpStatusCode.BAD_REQUEST);
    }

    const { email, name, sub } = await checkGoogleIdToken({ googleIdToken: value.googleIdToken });
    if (email !== value.email || name !== value.name || sub !== value.googleId) {
      throw new NewError(HttpStatusCode.UNAUTHORIZED);
    }

    const user = await userRepo.findOne({ googleId: value.googleId });
    if (!user) {
      throw new NewError(HttpStatusCode.BAD_REQUEST);
    }

    const token = encodeToken(user.userTokenId);

    res.status(HttpStatusCode.OK).json({
      token,
    });
  } catch (e) {
    const { status, message } = getErrorResponse(e);

    res.status(status).json({
      status,
      message,
    });
  }
};
