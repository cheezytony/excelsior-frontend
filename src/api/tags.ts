import { apiRequest } from '.';
import { toQuery } from '../utils/filters';

export function getTags<T>(params?: { limit: number }) {
  const query = params && toQuery(params);
  
  return apiRequest<T>({
    method: 'GET',
    url: `/tags?${query}`,
  });
}

export function getTag<T>(tag: string) {
  return apiRequest<T>({
    method: 'GET',
    url: `/tags/${tag}`,
  });
}

export function getTagPosts<T>(tag: string) {
  return apiRequest<T>({
    method: 'GET',
    url: `/posts?tags=${tag}`,
  });
}
