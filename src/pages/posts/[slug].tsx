import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { getPost, getPostComments } from '../../api/posts';
import { CommentForm, CommentList } from '../../components/common/comments';
import { Post } from '../../components/common/post';
import AppLayout from '../../layouts/AppLayout';
import { CommentModel, PostModel } from '../../types/models';
import { truncateString } from '../../utils/filters';

interface PageProps {
  comments: Array<CommentModel>;
  post: PostModel;
}

const PostPage: NextPage<PageProps> = ({ comments = [], post }: PageProps) => {
  return (
    <AppLayout>
      <Head>
        <title>{post.title} | Blog</title>
        <meta name="description" content={truncateString(post.body)} />
        <meta name="author" content={post.user.full_name} />
        {post.featured_image && (
          <>
            <meta name="image" content={post.featured_image} />
            <meta name="screenshot" content={post.featured_image} />
          </>
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={truncateString(post.body)} />
        <meta name="twitter:image" content={post.featured_image} />
        <meta name="twitter:site" content="" />
        <meta name="twitter:creator" content="" />
      </Head>
      <article className="flex flex-col gap-20 max-w-[900px] w-full">
        <Post {...post} status="single" />
        <div className="flex flex-col gap-10" id="comments">
          <div className="font-bold text-gray-500 text-sm">
            Comments {!!post.comments_count && `(${post.comments_count})`}:
          </div>
          <CommentForm />
          <CommentList comments={comments} />
        </div>
      </article>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params;
  let comments: Array<CommentModel> = [];
  let post: PostModel;

  await getPost<{ data: { post: PostModel } }>(slug as string)
    .then(({ data }) => {
      post = data.post;
    })
    .catch((error) => {
      console.log(error);
    });

  if (!post) {
    return {
      notFound: true,
    };
  }

  await getPostComments(post.id)
    .then(({ data }) => {
      comments = data.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    props: {
      comments,
      post,
    },
  };
};

export default PostPage;
