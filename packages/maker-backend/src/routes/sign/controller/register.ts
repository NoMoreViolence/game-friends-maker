import { Request, Response } from 'express';
import * as Joi from '@hapi/joi';
import { HttpStatusCode } from '@constants';
import { UserModel } from '@models';
import { NewError, getErrorResponse, checkGoogleIdToken, encryption, encodeToken } from '@helpers';

interface RegisterPayload {
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

export const register = async (req: Request, res: Response) => {
  try {
    const { error, value } = body.validate(req.body as RegisterPayload);
    if (error) {
      throw new NewError(HttpStatusCode.BAD_REQUEST);
    }

    const { email, name, sub } = await checkGoogleIdToken({ googleIdToken: value.googleIdToken });
    if (email !== value.email || name !== value.name || sub !== value.googleId) {
      throw new NewError(HttpStatusCode.UNAUTHORIZED);
    }

    const user = await UserModel.findOne({ googleId: value.googleId }).exec();
    if (user) {
      throw new NewError(HttpStatusCode.CONFLICT);
    }

    const newUserModel = new UserModel({ name: value.name, email: value.email, googleId: value.googleId });
    const createdUser = await newUserModel.save();

    const userTokenId = encryption(createdUser._id.toString());
    await createdUser.update({ userTokenId }).exec();
    const token = encodeToken(userTokenId);

    res.status(HttpStatusCode.CREATED).json({
      status: HttpStatusCode.CREATED,
      message: 'Register success',
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
