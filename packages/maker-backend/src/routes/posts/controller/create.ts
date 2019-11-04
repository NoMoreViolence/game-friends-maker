import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { GameModel, PostModel } from '@common-server';
import { HttpStatusCode } from '@constants';
import { UserToken } from '@middlewares';
import { getErrorResponse, requestValidator, NewError } from '@helpers';
import * as Joi from '@hapi/joi';

interface CreatePostPayoad {
  postName: string;
  gameId: string;
  limit: number;
  introduction?: string;
}
export const createPostBody = Joi.object({
  postName: Joi.string().required(),
  gameId: Joi.string().required(),
  limit: Joi.number()
    .min(1)
    .max(500)
    .invalid(1)
    .required(),
  introduction: Joi.string().optional(),
});

export const createPosts = async (req: Request, res: Response) => {
  try {
    const payload = requestValidator<CreatePostPayoad>(createPostBody, req.body);
    if (!ObjectId.isValid(payload.gameId)) {
      throw new NewError(HttpStatusCode.BAD_REQUEST);
    }

    const tokenInfo: UserToken = res.locals;

    const game = await GameModel.findOne({ _id: payload.gameId }).exec();
    if (!game) {
      throw new NewError(HttpStatusCode.BAD_REQUEST);
    }

    const postModel = await new PostModel({
      authorId: tokenInfo.user._id,
      introduction: payload.introduction,
      name: payload.postName,
      gameId: new ObjectId(payload.gameId),
      limit: payload.limit,
    }).save();

    res.status(HttpStatusCode.CREATED).json({
      status: HttpStatusCode.CREATED,
      message: 'Post create success',
      value: {
        gameId: postModel._id,
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
