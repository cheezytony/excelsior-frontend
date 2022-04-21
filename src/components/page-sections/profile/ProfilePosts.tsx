import { useEffect } from 'react';
import { getUserPosts } from '../../../api/users';
import { useApiRequest } from '../../../hooks/api';
import { PostModel, UserModel } from '../../../types/models';
import { Posts } from '../../common/post';

export default function ProfilePosts({ user }: { user: UserModel }) {
  const { data, isLoading, sendRequest } = useApiRequest<{
    data: {
      data: Array<PostModel>;
    };
  }>(getUserPosts);

  useEffect(() => {
    sendRequest(user.id);
  }, []);
  
  if (isLoading) {
    return <>Loading...</>;
  }
  if (!data?.data?.data) {
    return <>Unable to get posts</>;
  }
  return <Posts posts={data.data.data} status="user-showcase" />;
}
