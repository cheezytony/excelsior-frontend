import { GetServerSideProps, NextPage } from 'next';
import { getUser } from '../../api/users';
import { UserModel } from '../../types/models';
import ProfilePage from '../me';

const UserPage: NextPage<{ user: UserModel }> = ({ user }: { user: UserModel }) => {
  return <ProfilePage user={user} />;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { username } = params;
  let user: UserModel;

  await getUser(username?.toString())
    .then(({ data }) => {
      user = data.user;
    })
    .catch((error) => console.log(error));
  
  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: { user }
  };
};

export default UserPage;
