import { Request, Response } from 'express';
import { getMongoManager } from 'typeorm';
import { HttpStatusCode } from '@constants';
import { User } from '@models';
import { getErrorResponse, NewError, Decoded } from '@helpers';

export const check = async (req: Request, res: Response) => {
  try {
    const userRepo = getMongoManager().getRepository(User);

    const token: Decoded = res.locals;
    const user = await userRepo.findOne({ userTokenId: token.data._id });
    if (!user) {
      throw new NewError(HttpStatusCode.UNAUTHORIZED);
    }

    const { email, name } = user;
    res.status(HttpStatusCode.OK).json({
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
