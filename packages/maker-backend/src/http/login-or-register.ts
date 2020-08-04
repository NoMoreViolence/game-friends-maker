import { UserModel } from '@common-server/db/models';
import { HttpStatusCode } from '@constants';
import { dbConnect } from '@database';
import { checkGoogleIdToken, encodeToken, getErrorResponse, NewError } from '@helpers';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import * as jf from 'joiful';

const createUser = async (body: Body) => {
  const user = await UserModel.findOne({ googleId: body.googleId });
  if (user) {
    return user;
  }

  const googleData = await checkGoogleIdToken({ tokenId: body.tokenId });
  if (body.email !== googleData.email || body.googleId !== googleData.sub) {
    throw new NewError(HttpStatusCode.BAD_REQUEST);
  }

  const newUserModel = new UserModel(body);
  return newUserModel.save();
};

class Body {
  @(jf.string().required())
  email: string;

  @(jf.string().required())
  givenName: string;

  @(jf.string().required())
  familyName: string;

  @(jf.string().required())
  googleId: string;

  @(jf.string().required())
  tokenId: string;
}

export async function loginOrRegister(event: APIGatewayProxyEvent, context: Context) {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    const { success, alreadyHasConnection } = await dbConnect();
    if (!success && !alreadyHasConnection) {
      throw new NewError(HttpStatusCode.INTERNAL_SERVER_ERROR);
    }

    const requestBody: Body = JSON.parse(event.body || '');
    const { value, error } = jf.validateAsClass(requestBody, Body);

    if (error) {
      throw new NewError(HttpStatusCode.BAD_REQUEST);
    }

    const user = await createUser(value);
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
