import { HttpStatusCode } from '@constants';
import { NewError } from '@helpers';
import axios from 'axios';

interface GoogleTokenResponse {
  email: string;
  sub?: string;
}

export const checkGoogleIdToken = async ({ tokenId }: { tokenId: string }) => {
  try {
    const response = await axios.get('https://oauth2.googleapis.com/tokeninfo', {
      params: {
        id_token: tokenId,
      },
      headers: {},
    });

    return response.data as GoogleTokenResponse;
  } catch (e) {
    throw new NewError(HttpStatusCode.UNAUTHORIZED);
  }
};
