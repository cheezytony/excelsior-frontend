import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useMemo, useState } from 'react';
import { IconDocument, IconMessage } from '../components/common/icons';
import { Nav, NavItem } from '../components/common/nav';
import ProfileBasicInformation from '../components/page-sections/profile/ProfileBasicInformation';
import ProfileComments from '../components/page-sections/profile/ProfileComments';
import ProfilePosts from '../components/page-sections/profile/ProfilePosts';
import { getSession } from '../hooks/auth';
import AppLayout from '../layouts/AppLayout';
import { UserModel } from '../types/models';

interface PageProps {
  user: UserModel;
}

const ProfilePage: NextPage<PageProps> = ({ user }: PageProps) => {
  const [tab, setTab] = useState<number>(0);
  const component = useMemo(
    () =>
      [
        <ProfilePosts key="ProfilePosts" user={user} />,
        <ProfileComments key="ProfileComments" />,
      ][tab],
    [tab]
  );
  return (
    <AppLayout>
      <Head>
        <title>{user.full_name} | Blog</title>
      </Head>
      <article className="flex flex-col gap-8">
        <ProfileBasicInformation user={user} />
        <hr className="dark:border-gray-700" />
        <div className="flex flex-col gap-4">
          <Nav>
            <NavItem
              icon={<IconDocument />}
              isActive={tab === 0}
              onClick={() => setTab(0)}
            >
              <span>
                Posts{' '}
                {!!user.posts_count && (
                  <em className="font-bold ml-1 not-italic text-gray-500 text-sm">
                    {user.posts_count}
                  </em>
                )}
              </span>
            </NavItem>
            <NavItem
              icon={<IconMessage />}
              isActive={tab === 1}
              onClick={() => setTab(1)}
            >
              Comments{' '}
              {!!user.comments_count && (
                <em className="font-bold ml-1 not-italic text-gray-500 text-sm">
                  {user.comments_count}
                </em>
              )}
            </NavItem>
          </Nav>
          <div className="max-w-[900px] w-full">{component}</div>
        </div>
      </article>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession(req);
  const user = session?.user;
  if (!user) {
    return {
      props: {},
      redirect: {
        destination: '/login',
      },
    };
  }
  return { props: { user } };
};

export default ProfilePage;
