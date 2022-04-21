import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getTopics } from '../../api/topics';
import { Tag } from '../../components/common/tag';
import AppLayout from '../../layouts/AppLayout';
import { TopicModel } from '../../types/models';

const TopicsPage: NextPage<{ topics: Array<TopicModel> }> = ({
  topics,
}: {
  topics: Array<TopicModel>;
}) => {

  return (
    <AppLayout>
      <Head>
        <title>All Topics | Blog</title>
      </Head>
      <article className="max-w-[900px] w-full">
        <div className="flex flex-wrap gap-4">
          {topics.map((topic) => (
            <Link key={topic.id} href={`/topics/${topic.slug}`}>
              <a>
                <Tag>{topic.title}</Tag>
              </a>
            </Link>
          ))}
        </div>
      </article>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let topics: Array<TopicModel> = [];

  await getTopics<{ data: { data: Array<TopicModel> } }>({ limit: 50 })
    .then(({ data: { data } }) => {
      topics = data;
    })
    .catch((error) => console.log(error));

  return {
    props: {
      topics,
    },
  };
};

export default TopicsPage;
