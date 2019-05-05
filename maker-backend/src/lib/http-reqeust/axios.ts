import { AxiosPromise, AxiosRequestConfig, AxiosStatic } from 'axios';

export interface IAxiosGetRequest {
  url: string;
  config: AxiosRequestConfig;
}

export class AxiosRequests {
  constructor(private axios: AxiosStatic) {}

  public axiosGetRequest = (axiosGet: IAxiosGetRequest = { url: '', config: {} }): AxiosPromise =>
    this.axios.get(axiosGet.url, axiosGet.config);
}
