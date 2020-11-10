import { chain } from 'lodash';
import qs from 'qs';
import { Middleware } from 'utils/applyMiddlewares';
import { badRequest } from 'utils/httpResponses';
import * as Yup from 'yup';

export const bodyParamsParser = <T extends object>(
  yupSchema: Yup.ObjectSchema<Yup.Shape<object | undefined, T>>,
): Middleware<{ bodyParams: T }, {}, {}, {}> => (handler) => async (
  event,
  context,
  callback,
) => {
  const normalizedHeaders = chain(event.headers)
    .clone()
    .mapKeys((_value, key) => key.toLowerCase())
    .mapValues((value) => value.toLowerCase())
    .value();

  try {
    let bodyParams = {};
    if (
      normalizedHeaders['content-type'] === 'application/x-www-form-urlencoded'
    ) {
      bodyParams = qs.parse(event.body || '');
    } else {
      bodyParams = JSON.parse(event.body || '');
    }

    try {
      const castedBodyParams = yupSchema.validateSync(bodyParams, {
        abortEarly: false,
        strict: false,
        stripUnknown: true,
      }) as T;
      return handler(
        {
          ...event,
          bodyParams: castedBodyParams,
        },
        context,
        callback,
      );
    } catch (validationError) {
      console.log({ validationError });
      return badRequest(
        'InvalidBodyParams',
        chain(validationError).pick('errors', 'inner').value(),
      );
    }
  } catch (error) {
    return badRequest('InvalidJsonRequestBody');
  }
};
