import { Request, Response } from 'express';
// import { HttpStatusCode } from '@constants';
import { getErrorResponse, requestValidator, Decoded } from '@helpers';
import * as Joi from '@hapi/joi';
// import { findPosts } from '@routes/posts/query';
import { UserModel } from '@common-server';

interface CreatePostPayoad {
  postName: string;
  gameName: string;
  genres: string[];
  partyNumber: number;
}
export const createPostBody = Joi.object({
  offset: Joi.number().optional(),
  gameName: Joi.string().optional(),
});

export const readPosts = async (req: Request, res: Response) => {
  try {
    const payload = requestValidator<CreatePostPayoad>(createPostBody, req.query);
    const token: Decoded = res.locals;
    const user = await UserModel.findOne({ userTokenId: token.data._id }).exec();

    console.log(payload, user);
  } catch (e) {
    const { status, message } = getErrorResponse(e);

    res.status(status).json({
      status,
      message,
    });
  }
};
