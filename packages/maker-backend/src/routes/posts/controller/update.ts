import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { string, object } from '@hapi/joi';

import { HttpStatusCode } from '@constants';
import { getPostIdAndUpdate } from '@routes/posts/query';
import { getErrorResponse, requestValidator, NewError } from '@helpers';

interface UpdatePostPayoad {
  postId: string;
  gameId: string;
  postName: string;
  introduction?: string;
}
export const updatePostBody = object({
  postId: string().required(),
  gameId: string().optional(),
  postName: string().optional(),
  introduction: string().optional(),
});

export const updatePost = async (req: Request, res: Response) => {
  try {
    const payload = requestValidator<UpdatePostPayoad>(updatePostBody, req.body);

    if (!ObjectId.isValid(payload.postId)) {
      throw new NewError(HttpStatusCode.BAD_REQUEST);
    }

    const updatedPost = await getPostIdAndUpdate(payload);

    res.status(HttpStatusCode.OK).json({
      status: HttpStatusCode.OK,
      message: 'Post update success',
      value: updatedPost,
    });
  } catch (e) {
    const { status, message } = getErrorResponse(e);

    res.status(status).json({
      status,
      message,
    });
  }
};
