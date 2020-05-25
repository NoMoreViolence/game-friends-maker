import { HttpStatusCode } from '@constants';
import { dbConnect } from '@database';
import { authChecker } from '@gql/bootstrap/auth';
import { injectId } from '@gql/bootstrap/session';
import * as Resolvers from '@gql/resolvers';
import { ApolloServer } from 'apollo-server-lambda';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Callback } from 'aws-lambda';
import * as TypeGraphQL from 'type-graphql';
import { Container } from 'typedi';

if (global.schema) {
  console.log('global.schema already exists!');
} else {
  console.log('building global schema...', process.env.ENV);
  global.schema = TypeGraphQL.buildSchemaSync({
    resolvers: Object.values(Resolvers),
    authChecker,
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
  },
  extensions: [],
  playground: true,
  debug: process.env.ENV === 'dev',
  introspection: true,
  context: injectId,
});

const apolloServerHandler = apolloServer.createHandler({
  cors: {
    origin: '*',
    methods: ['POST', 'GET'],
  },
});

export const bootstrap = async (event: APIGatewayProxyEvent, context, callback: Callback<APIGatewayProxyResult>) => {
  const { success, alreadyHasConnection } = await dbConnect();
  if (!success && !alreadyHasConnection) {
    return {
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      message: 'Database connect failure',
    };
  }
  return apolloServerHandler(event, context, callback);
};
