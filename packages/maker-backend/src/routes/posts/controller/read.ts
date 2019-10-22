import { Request, Response } from 'express';
import { HttpStatusCode } from '@constants';
import { getErrorResponse, requestValidator } from '@helpers';
import * as Joi from '@hapi/joi';
import { findPosts } from '@routes/posts/query';

interface ReadPostsExtraPayload {
  offset?: number;
  gameName?: string;
}
interface ReadPostsPayload extends ReadPostsExtraPayload {}

export const readPostsQueryString = Joi.object({
  offset: Joi.number().optional(),
  gameName: Joi.string().optional(),
});

export const readPosts = async (req: Request, res: Response) => {
  try {
    const payload = requestValidator<ReadPostsPayload>(readPostsQueryString, req.query);

    const posts = await findPosts(payload);

    res.status(HttpStatusCode.OK).json({
      status: HttpStatusCode.OK,
      message: 'Read posts success',
      value: posts,
    });
  } catch (e) {
    const { status, message } = getErrorResponse(e);

    res.status(status).json({
      status,
      message,
    });
  }
};
