import { createPost } from '../api/posts';
import { getToken } from './auth';

export const useCreatePost = () => {
  const token = getToken();
  
  return (formData: FormData) =>
    createPost(formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
};