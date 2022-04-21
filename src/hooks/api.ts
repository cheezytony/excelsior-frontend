/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

interface DataTransformer<ResponseData, ErrorData> {
  transformData?: (data: any) => ResponseData;
  transformError?: (data: any) => ErrorData;
}

export function useApiRequest<ResponseData = unknown, ErrorData = unknown>(
  apiRequest: (...args: Array<unknown>) => Promise<unknown>,
  initialData?: ResponseData,
  { transformData, transformError }: DataTransformer<ResponseData, ErrorData> = {}
) {
  const [data, setData] = useState<ResponseData>(initialData);
  const [error, setError] = useState<ErrorData>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendRequest = async (...args: Array<unknown>) => {
    setIsLoading(true);
    await apiRequest(...args)
      .then((data: ResponseData) =>
        setData(transformData ? transformData(data) : data)
      )
      .catch((error: ErrorData) =>
        setError(transformError ? transformError(error) : error)
      );
    setIsLoading(false);
  };

  return { data, error, isLoading, sendRequest };
}
