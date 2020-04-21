import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { UserModel } from '@common-server';
import { checkGoogleIdToken, encodeToken, NewError, getErrorResponse } from '@helpers';
import { string, object } from '@hapi/joi';
import { HttpStatusCode } from '@constants';
import { dbConnect } from '@database';

const createUser = async (name: string, email: string, googleId: string, googleIdToken: string) => {
  const user = await UserModel.findOne({ googleId });
  if (user) {
    return user;
  }

  const googleData = await checkGoogleIdToken({ googleIdToken });
  if (email !== googleData.email || name !== googleData.name || googleId !== googleData.sub) {
    throw new NewError(HttpStatusCode.BAD_REQUEST);
  }

  const newUserModel = new UserModel({ name, email, googleId });
  return newUserModel.save();
};

interface Body {
  name: string;
  email: string;
  googleId: string;
  googleIdToken: string;
}
const body = object({
  name: string().required(),
  email: string().required(),
  googleId: string().required(),
  googleIdToken: string().required(),
});
export async function loginOrRegister(event: APIGatewayProxyEvent, context: Context) {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    const { success, alreadyHasConnection } = await dbConnect();
    if (!success && !alreadyHasConnection) {
      throw new NewError(HttpStatusCode.INTERNAL_SERVER_ERROR);
    }

    const requestBody: Body = JSON.parse(event.body || '');
    const { value, error } = body.validate(requestBody);

    if (error) {
      throw new NewError(HttpStatusCode.BAD_REQUEST);
    }

    const user = await createUser(value.name, value.email, value.googleId, value.googleIdToken);
    const token = encodeToken(user._id);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        message: 'success',
        data: { token },
      }),
    };
  } catch (e) {
    const { status, message } = getErrorResponse(e);

    return {
      statusCode: status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        message,
        data: { error: true },
      }),
    };
  }
}
