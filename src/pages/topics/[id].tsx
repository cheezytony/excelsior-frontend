import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { getTopic, getTopicPosts } from '../../api/topics';
import { Posts } from '../../components/common/post';
import AppLayout from '../../layouts/AppLayout';
import { PostModel, TopicModel } from '../../types/models';

const TopicPostsPage: NextPage<{
  posts: Array<PostModel>;
  topic: TopicModel;
}> = ({ posts, topic }: { topic: TopicModel; posts: Array<PostModel> }) => {
  return (
    <AppLayout>
      <Head>
        <title>{topic.title} - Topics | Blog</title>
      </Head>
      <article className="max-w-[900px] w-full">
        <Posts posts={posts} status="topic-showcase" />
      </article>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params;
  let posts: Array<PostModel>;
  let topic: TopicModel;

  await getTopic<{ data: { topic: TopicModel } }>(id as string)
    .then(({ data }) => (topic = data.topic))
    .catch((error) => console.log(error));

  if (!topic) {
    return {
      notFound: true,
    };
  }

  await getTopicPosts<{ data: { data: Array<PostModel> } }>(topic.id)
    .then(({ data }) => {
      posts = data.data;
    })
    .catch((error) => console.log(error));

  return { props: { posts, topic } };
};

export default TopicPostsPage;
