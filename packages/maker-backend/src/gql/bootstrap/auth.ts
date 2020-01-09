import { AuthChecker } from 'type-graphql';
import { Context } from '@gql/bootstrap/session';

export const authChecker: AuthChecker<Context> = ({ context }) => !!(context.session && context.session._id);
