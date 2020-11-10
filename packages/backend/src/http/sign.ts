import 'lib/registerTypescriptTools';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { UserModel } from 'co-hope-common-server';
import { ENV } from 'constants/ENV';
import { OAuth2Client } from 'google-auth-library';
import { bodyParamsParser } from 'middlewares/bodyParamsParser';
import { exceptionCatcher } from 'middlewares/exceptionCatcher';
import { mongooseConnector } from 'middlewares/mongooseConnector';
import { ObjectId } from 'mongodb';
import { applyMiddlewares } from 'utils/applyMiddlewares';
import { badRequest, ok } from 'utils/httpResponses';
import { encodeToken } from 'utils/jwt';
import * as Yup from 'yup';

const bodyParamsSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required(),
  idToken: Yup.string().required(),
});
export const handler: APIGatewayProxyHandler = applyMiddlewares(
  exceptionCatcher,
  mongooseConnector,
  bodyParamsParser(bodyParamsSchema),
)(async (event, _context, _callback) => {
  const client = new OAuth2Client(ENV.GOOGLE_CLIENT);

  try {
    const ticket = await client.verifyIdToken({
      idToken: event.bodyParams.idToken,
      audience: ENV.GOOGLE_SECRET, // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload();
    if (!payload || !payload.email || !payload.name) {
      throw new Error('Google sign failed');
    }
    const { sub: googleId, email, name } = payload;
    const user = await UserModel.findOne({
      email,
      googleId,
    });

    // Sign
    if (user && !user.isDeleted) {
      return ok('accessToken', encodeToken(user.userId.toHexString()));
    }

    // Register
    if (!user) {
      const userModel = new UserModel({
        userId: new ObjectId(),
        googleId,
        email,
        name,
      });
      const userDoc = await userModel.save();
      return ok('accessToken', encodeToken(userDoc.userId.toHexString()));
    }

    // Restore
    const userDoc = await UserModel.findOneAndUpdate(
      { email: user.email, googleId: user.googleId },
      { isDeleted: false },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
        context: 'query',
      },
    );

    return ok('accessToken', encodeToken(userDoc.userId.toHexString()));
  } catch (e) {
    console.error(e);
    return badRequest('UnAuthorized');
  }
});
