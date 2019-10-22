import * as Joi from '@hapi/joi';
import { HttpStatusCode } from '@constants';
import { NewError } from '@helpers';

export const requestValidator = <T>(schema: Joi.ObjectSchema, validateParams: T) => {
  const {
    error,
    value,
  }: {
    error: Joi.ValidationError;
    value: T;
  } = schema.validate(validateParams);

  if (error) {
    throw new NewError(HttpStatusCode.BAD_REQUEST);
  }

  return value;
};
