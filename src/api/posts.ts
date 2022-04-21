import { AxiosRequestConfig } from 'axios';
import { apiRequest } from '.';
import { CommentModel } from '../types/models';
import { toQuery } from '../utils/filters';

export function getPosts<T>(params?: { page?: number; limit?: number }) {
  const query = params && toQuery(params);

  return apiRequest<T>({
    method: 'GET',
    url: `/posts?${query || ''}`,
  });
}

export function getPost<T>(slug: string) {
  return apiRequest<T>({
    method: 'GET',
    url: `/posts/${slug}`,
  });
}

export function getPostComments(
  postId: number | string,
  params?: { page?: number; limit?: number }
) {
  const query = params && toQuery(params);
  return apiRequest<{ data: { data: Array<CommentModel> } }>({
    method: 'GET',
    url: `/posts/${postId}/comments?${query || ''}`,
  });
}

export function createPost<T>(formData: FormData, config?: AxiosRequestConfig) {
  return apiRequest<T>({
    ...config,
    method: 'POST',
    url: '/posts',
    data: formData,
  });
}
