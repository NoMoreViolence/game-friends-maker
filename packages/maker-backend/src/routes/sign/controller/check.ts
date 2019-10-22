import { Request, Response } from 'express';
import { HttpStatusCode } from '@constants';
import { UserModel } from '@models';
import { getErrorResponse, NewError, Decoded } from '@helpers';

export const check = async (req: Request, res: Response) => {
  try {
    const token: Decoded = res.locals;
    const user = await UserModel.findOne({ userTokenId: token.data._id }).exec();
    if (!user) {
      throw new NewError(HttpStatusCode.UNAUTHORIZED);
    }

    const { email, name } = user;
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
