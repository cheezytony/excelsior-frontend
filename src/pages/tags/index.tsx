import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getTags } from '../../api/tags';
import { Tag } from '../../components/common/tag';
import AppLayout from '../../layouts/AppLayout';
import { TagModel } from '../../types/models';

const TagsPage: NextPage<{ tags: Array<TagModel> }> = ({
  tags,
}: {
  tags: Array<TagModel>;
}) => {

  return (
    <AppLayout>
      <Head>
        <title>All Tags | Blog</title>
      </Head>
      <article className="max-w-[900px] w-full">
        <div className="flex flex-wrap gap-4">
          {tags.map((tag) => (
            <Link key={tag.id} href={`/tags/${tag.slug}`}>
              <a>
                <Tag>{tag.title}</Tag>
              </a>
            </Link>
          ))}
        </div>
      </article>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let tags: Array<TagModel> = [];

  await getTags<{ data: { data: Array<TagModel> } }>({ limit: 50 })
    .then(({ data: { data } }) => {
      tags = data;
    })
    .catch((error) => console.log(error));

  return {
    props: {
      tags,
    },
  };
};

export default TagsPage;
