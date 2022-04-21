import { apiRequest } from '.';
import { PostModel, UserModel } from '../types/models';

export function getUser(username: string) {
  return apiRequest<{ data: { user: UserModel } }>({
    method: 'GET',
    url: `/users/${username}`,
  });
}

export function getUserPosts(userId: number | string) {
  return apiRequest<{ data: { data: Array<PostModel> } }>({
    url: `/posts?user_id=${userId}`,
  });
}
