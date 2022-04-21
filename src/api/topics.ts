import { apiRequest } from '.';
import { toQuery } from '../utils/filters';

export function getTopics<T>(params?: { limit: number }) {
  const query = params && toQuery(params);
  return apiRequest<T>({
    method: 'GET',
    url: `/topics?${query || ''}`,
  });
}

export function getTopic<T>(topic: string) {
  return apiRequest<T>({
    method: 'GET',
    url: `/topics/${topic}`,
  });
}

export function getTopicPosts<T>(Id: number) {
  return apiRequest<T>({
    method: 'GET',
    url: `/posts?topic_id=${Id}`,
  });
}
