import { AuthenticationError } from 'apollo-server-lambda';
import { Service } from 'typedi';
import { UserModel } from '@common-server';
import { UserService } from '@gql/services';
import { checkGoogleIdToken } from '@helpers';

@Service()
export class SignController {
  constructor(private userService: UserService) {}
}
