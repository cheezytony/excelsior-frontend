import axios, { AxiosRequestConfig } from 'axios';
import { HTTPError } from '../types/http';

export function apiRequest<ResponseData = unknown>(config: AxiosRequestConfig) {
  return new Promise<ResponseData>((resolve, reject) => {
    axios({ ...config, baseURL: process.env.REACT_API_BASEURL })
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error: HTTPError) => {
        reject(error?.response?.data);
      });
  });
}
