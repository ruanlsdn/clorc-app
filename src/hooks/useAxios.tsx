import { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

type args = {
  axiosInstance: AxiosInstance;
  url: string;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  config?: AxiosRequestConfig;
};

const useAxios = <T, X>() => {
  const [data, setData] = useState<X | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState<AbortController>();

  const fetchData = async ({ axiosInstance, method, url, config }: args, body?: T) => {
    try {
      setLoading(true);

      const ctrl = new AbortController();
      setController(ctrl);

      let response;
      if (body) {
        response = await axiosInstance[method](url, body, {
          ...config,
          signal: ctrl.signal,
        });
      } else {
        response = await axiosInstance[method](url, {
          ...config,
          signal: ctrl.signal,
        });
      }

      setData(response.data);
      setStatus(response.status);
      setError(null);

      return response.data as X;
    } catch (error) {
      setError(error as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      controller && controller.abort();
    };
  }, [controller]);

  return { data, status, error, loading, fetchData };
};

export default useAxios;
