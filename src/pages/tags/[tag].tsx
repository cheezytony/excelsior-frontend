import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { getTag, getTagPosts } from '../../api/tags';
import { Posts } from '../../components/common/post';
import AppLayout from '../../layouts/AppLayout';
import { PostModel, TagModel } from '../../types/models';

const TagPostsPage: NextPage<{ posts: Array<PostModel>; tag: TagModel }> = ({
  posts,
  tag,
}: {
  tag: TagModel;
  posts: Array<PostModel>;
}) => {
  return (
    <AppLayout>
      <Head>
        <title>{tag.title} - Tags | Blog</title>
      </Head>
      <article className="max-w-[900px] w-full">
        <Posts posts={posts} />
      </article>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { tag: slug } = params;
  let posts: Array<PostModel>;
  let tag: TagModel;

  await getTag<{ data: { tag: TagModel } }>(slug as string)
    .then(({ data }) => (tag = data.tag))
    .catch((error) => console.log(error));

  if (!tag) {
    return {
      notFound: true,
    };
  }

  await getTagPosts<{ data: { data: Array<PostModel> } }>(slug as string)
    .then(({ data }) => {
      posts = data.data;
    })
    .catch((error) => console.log(error));

  return { props: { posts, tag } };
};

export default TagPostsPage;
