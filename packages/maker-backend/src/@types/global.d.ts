import { GraphQLSchema } from 'graphql/type/schema';

declare global {
  namespace NodeJS {
    interface Global {
      schema?: GraphQLSchema;
    }
  }
}
