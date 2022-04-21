import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import NewPostActions from '../../components/page-sections/posts/new/NewPostActions';
import NewPostForm from '../../components/page-sections/posts/new/NewPostForm';
import { NewPostContextWrapper } from '../../contexts/NewPostContext';
import { getSession } from '../../hooks/auth';
import AppLayout from '../../layouts/AppLayout';

const NewPostPage: NextPage = () => {
  return (
    <AppLayout>
      <Head>
        <title>Create Post | Blog</title>
      </Head>
      <NewPostContextWrapper>
        <article>
          <div className="flex flex-col gap-8 flex-shrink-0 max-w-[860px]">
            <NewPostForm />
            <NewPostActions />
          </div>
        </article>
      </NewPostContextWrapper>
    </AppLayout>
  );
};

export default NewPostPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession(req);
  if (!session?.user) {
    return {
      props: {},
      redirect: {
        destination: '/login',
      },
    };
  }
  return { props: { session } };
};
