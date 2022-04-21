/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useMemo } from 'react';
import { PostModel, TagModel } from '../../types/models';
import { toReadableDate, truncateString } from '../../utils/filters';
import { Button } from './button';
import { IconMessage } from './icons';
import { Tag } from './tag';

export interface PostAttributes extends PostModel {
  status?: 'list' | 'preview' | 'single' | 'topic-showcase' | 'user-showcase';
}

export function Post({
  body,
  comments_count,
  created_at,
  featured_image,
  preview,
  slug,
  status,
  tags,
  title,
  topic,
  user,
}: PostAttributes) {
  const activeTags = useMemo<Array<TagModel>>(() => {
    return ['single', 'preview'].includes(status) ? tags : tags.slice(0, 3);
  }, [tags]);
  const hiddenTags = useMemo<number>(
    () => tags.length - activeTags.length,
    [activeTags, tags]
  );

  return (
    <article className="flex flex-col gap-4" id={`post-${slug}`}>
      <div className="flex gap-2 items-center">
        {status !== 'user-showcase' && (
          <>
            <Link href={`/users/${user.username}`}>
              <a className="inline-flex gap-2 items-center">
                <span className="font-bold text-blue-300">
                  {user.first_name} {user.last_name}
                </span>
              </a>
            </Link>
            <span className="font-black text-3xl text-gray-400">&middot;</span>
          </>
        )}
        <div className="font-bold text-sm text-gray-400">
          {toReadableDate(created_at)}
        </div>
      </div>

      {!['preview', 'single'].includes(status) ? (
        <Link href={`/posts/${slug}`}>
          <a>
            <h2
              className="duration-300 font-black font-heading text-4xl hover:text-gray-500"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </a>
        </Link>
      ) : (
        <h2
          className="duration-300 font-black font-heading text-4xl"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      )}

      {featured_image ? (
        <div className="bg-gray-100 pb-[50%] relative">
          <Image
            src={featured_image}
            alt={title}
            className="absolute h-full inset-0 object-cover w-full"
            layout="fill"
          />
        </div>
      ) : (
        !['preview', 'single'].includes(status) && (
          <div className="prose max-w-full">{truncateString(preview, 200)}</div>
        )
      )}

      <div className="flex flex-wrap gap-2 items-center">
        <Button href={`/posts/${slug}#comments`} className="gap-2 inline-flex items-center">
          <span className="text-blue-300">
            <IconMessage />
          </span>
          <span className="text-blue-500 text-sm">{comments_count}</span>
        </Button>
        {status !== 'topic-showcase' && (
          <>
            <span className="border-l h-6 mx-2"></span>
            <Link href={`/topics/${topic.slug}`}>
              <a className="capitalize text-gray-500 text-sm">{topic.title}</a>
            </Link>
          </>
        )}
        <span className="border-l h-6 mx-2"></span>
        {activeTags.map((tag, index) => (
          <Link key={index} href={`/tags/${tag.slug}`}>
            <a>
              <Tag>{tag.title}</Tag>
            </a>
          </Link>
        ))}
        {!!hiddenTags && (
          <span className="text-gray-500 text-xs">+{hiddenTags} more</span>
        )}
      </div>

      {['preview', 'single'].includes(status) && (
        <div
          className="prose prose-slate prose-lg max-w-full dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      )}
    </article>
  );
}

export function Posts({
  posts,
  status = 'list',
}: {
  posts: Array<PostModel>;
  status?: 'list' | 'topic-showcase' | 'user-showcase';
}) {
  return (
    <div className="flex flex-col gap-5">
      {posts.map((post, index) => (
        <Fragment key={post.id}>
          <div>
            <Post {...{ ...post, status }} />
          </div>
          {index < posts.length - 1 && (
            <hr key={index} className="dark:border-gray-700" />
          )}
        </Fragment>
      ))}
    </div>
  );
}
