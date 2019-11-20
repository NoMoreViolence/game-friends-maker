import { AuthChecker } from 'type-graphql';
import { Context } from '@gql/bootstrap/session';

export const authCheck: AuthChecker<Context> = ({ context }) => !!(context.session && context.session._id);
