import axios from 'axios';
import { HttpStatusCode } from '@constants';
import { NewError } from '@helpers';

interface GoogleTokenResponse {
  name: string;
  email: string;
  sub?: string;
}

export const checkGoogleIdToken = async ({ googleIdToken }: { googleIdToken: string }) => {
  try {
    const response = await axios.get('https://oauth2.googleapis.com/tokeninfo', {
      params: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        id_token: googleIdToken,
      },
      headers: {},
    });

    return response.data as GoogleTokenResponse;
  } catch (e) {
    throw new NewError(HttpStatusCode.UNAUTHORIZED);
  }
};
