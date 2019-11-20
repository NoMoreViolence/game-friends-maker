import { APIGatewayProxyEvent, APIGatewayProxyResult, Context, Callback } from 'aws-lambda';
import { ApolloServer, AuthenticationError } from 'apollo-server-lambda';
import * as TypeGraphQL from 'type-graphql';
import { Container } from 'typedi';
import { dbConnect } from '@database';
import * as Resolvers from '@gql/resolvers';
import { authCheck } from '@gql/bootstrap/auth';
import { injectId } from '@gql/bootstrap/session';

if (!global.schema) {
  console.log(process.env.ENV);
  global.schema = TypeGraphQL.buildSchemaSync({
    resolvers: Object.values(Resolvers),
    authChecker: authCheck,
    dateScalarMode: 'isoDate',
    validate: false,
    container: Container,
  });
}
const schema = global.schema;

const apolloServer = new ApolloServer({
  schema,
  engine: {
    apiKey: process.env.APOLLO_KEY,
    rewriteError(err) {
      // Return `null` to avoid reporting `AuthenticationError`s
      if (err instanceof AuthenticationError) {
        return null;
      }
      // All other errors will be reported.
      return err;
    },
  },
  extensions: [],
  playground: true,
  context: injectId,
  introspection: true,
  debug: process.env.ENV === 'dev',
});

const apolloServerHandler = apolloServer.createHandler({
  cors: { origin: '*', credentials: true },
});

export const bootstrap = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback<APIGatewayProxyResult>,
) => {
  await dbConnect();
  return apolloServerHandler(event, context, callback);
};
