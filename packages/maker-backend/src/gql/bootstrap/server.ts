import { APIGatewayProxyEvent, APIGatewayProxyResult, Context, Callback } from 'aws-lambda';
import { ApolloServer } from 'apollo-server-lambda';
import * as TypeGraphQL from 'type-graphql';
import { Container } from 'typedi';
import { dbConnect } from '@database';
import * as Resolvers from '@gql/resolvers';
import { authChecker } from '@gql/bootstrap/auth';
import { injectId } from '@gql/bootstrap/session';

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

export const bootstrap = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback<APIGatewayProxyResult>,
) => {
  await dbConnect();
  return apolloServerHandler(event, context, callback);
};
