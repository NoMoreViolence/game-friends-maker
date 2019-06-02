import axios, { AxiosResponse, AxiosError } from 'axios';
import { SearchPostPayload } from '@src/store/actions';
import { ErrorResponse, HttpCommonResponse, User } from '@models';
import { urlChange } from '@src/lib';
import qs from 'qs';

interface SearchPostsResponse extends HttpCommonResponse {
  raws: unknown[];
  count: number;
}
export const search = (payload: SearchPostPayload): Promise<SearchPostsResponse> =>
  axios
    .get(urlChange('/api/posts'), {
      headers: { },
      params: payload,
      paramsSerializer: params => qs.stringify(params),
    })
    .then((res: AxiosResponse<SearchPostsResponse>) => ({ ...res.data, error: false }))
    .catch((err: AxiosError) => ({
      raws: [],
      count: 0,
      error: true,
      message: (err.response as AxiosResponse<ErrorResponse>).data.error.message,
      status: (err.response as AxiosResponse<ErrorResponse>).data.error.status,
    }));
