import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { getPosts } from '../api/posts';
import { Button } from '../components/common/button';
import { Posts } from '../components/common/post';
import { getSession } from '../hooks/auth';
import AppLayout from '../layouts/AppLayout';
import { PostModel } from '../types/models';

interface PageProps {
  posts: Array<PostModel>;
}

const HomePage: NextPage<PageProps> = ({ posts: initialPosts }: PageProps) => {
  const [page, setPage] = useState<number>(1);
  const [posts, setPosts] = useState<Array<PostModel>>(() => initialPosts);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loadMoreRef = useRef<HTMLButtonElement>(null);
  const handleIntersection: IntersectionObserverCallback = ([entry]) => {
    if (isLoading) return;
    entry.isIntersecting && loadMoreRef.current.click();
  };
  const [observer, setObserver] = useState<IntersectionObserver>(null);

  useEffect(() => {
    setObserver(
      new IntersectionObserver((...args) => handleIntersection(...args))
    );
  }, []);
  
  useEffect(() => {
    if (!observer) return;
    observer.observe(loadMoreRef.current);
  }, [observer]);

  const loadMorePosts = async () => {
    setIsLoading(true);
    await getPosts<{ data: { data: Array<PostModel> } }>({ page: page + 1 })
      .then(({ data: { data } }) => {
        setPosts((p) => [...p, ...data]);
      })
      .catch((error) => console.log(error));
    setIsLoading(false);
    setPage((p) => p + 1);

  };

  return (
    <AppLayout>
      <Head>
        <title>Feed | Blog</title>
      </Head>
      <div className="flex">
        <div className="flex flex-col gap-32 max-w-[900px] w-full">
          <Posts posts={posts}></Posts>
          <div className="text-center">
            <Button
              ref={loadMoreRef}
              colorScheme="black"
              isLoading={isLoading}
              size="lg"
              onClick={loadMorePosts}
            >
              Load More
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession(req);

  let posts: Array<PostModel>;

  await getPosts<{ data: { data: Array<PostModel> } }>()
    .then(({ data: { data } }) => {
      posts = data;
    })
    .catch((error) => console.log(error));

  return { props: { posts, session } };
};
