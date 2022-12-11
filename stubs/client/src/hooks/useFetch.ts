import axios from '../common/axios';
import { AxiosRequestConfig } from 'axios';

interface fetch extends AxiosRequestConfig<any> {
  url: string;
  method?: 'POST' | 'GET' | 'DELETE' | 'PATCH' | 'PUT';
  data?: any;
}

export const useFetch =
  () =>
    async ({ url, method = 'GET', data = {}, ...attr }: fetch) => {

      try {
        const resolved = await axios({ method, url, data, ...attr });

        return resolved.data;
      } catch (error: any) {

        return error.response.data;
      }
    };
