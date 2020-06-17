import { dbConnect } from '@database';
import { authChecker } from '@gql/bootstrap/auth';
import { injectId } from '@gql/bootstrap/session';
import * as Resolvers from '@gql/resolvers';
import { ApolloServer } from 'apollo-server-lambda';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Callback, Context } from 'aws-lambda';
import * as TypeGraphQL from 'type-graphql';
import { Container } from 'typedi';

const resolvers = Object.values(Resolvers);
if (global.schema) {
  console.log('global.schema already exists!');
} else {
  console.log('building global schema...');
  global.schema = TypeGraphQL.buildSchemaSync({
    resolvers,
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
    credentials: true,
  },
});

export const bootstrap = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback<APIGatewayProxyResult>
) => {
  await dbConnect();
  return apolloServerHandler(event, context, callback);
};
