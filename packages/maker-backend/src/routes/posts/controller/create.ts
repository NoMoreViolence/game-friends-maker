import { Request, Response } from 'express';
import { object, string, number } from '@hapi/joi';

import { PostModel } from '@common-server';
import { HttpStatusCode } from '@constants';
import { UserToken } from '@middlewares';
import { getErrorResponse, requestValidator } from '@helpers';

interface CreatePostPayoad {
  postName: string;
  gameId: string;
  limit: number;
  introduction?: string;
}
export const createPostBody = object({
  postName: string().required(),
  gameId: string().required(),
  limit: number()
    .min(1)
    .max(500)
    .invalid(1)
    .required(),
  introduction: string().optional(),
});

export const createPost = async (req: Request, res: Response) => {
  try {
    const payload = requestValidator<CreatePostPayoad>(createPostBody, req.body);
    const tokenInfo: UserToken = res.locals;

    const postModel = await new PostModel({
      authorId: tokenInfo.user._id,
      introduction: payload.introduction,
      name: payload.postName,
      gameId: payload.gameId,
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
