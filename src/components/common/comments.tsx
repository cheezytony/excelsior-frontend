import Link from 'next/link';
import { Fragment } from 'react';
import { CommentModel } from '../../types/models';
import { toReadableDate } from '../../utils/filters';
import { Button } from './button';
import { FormGroup } from './form';
import { IconMessage } from './icons';

export interface CommentListAttributes {
  comments: Array<CommentModel>;
}

export const Comment: React.FC<CommentModel> = ({
  body,
  created_at,
  user,
}: CommentModel) => {
  return (
    <section className="flex flex-col gap-2 ">
      <div className="flex gap-2 items-center">
        <Link href={`/users/${user.username}`}>
          <a className="inline-flex gap-2 items-center">
            <span className="font-bold text-blue-300">
              {user.first_name} {user.last_name}
            </span>
          </a>
        </Link>
        <span className="font-black text-3xl text-gray-400">&middot;</span>
        <div className="font-bold text-sm text-gray-400">
          {toReadableDate(created_at)}
        </div>
      </div>
      <div
        className="prose prose-slate prose-sm max-w-full dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: body }}
      />
      <div>
        <Button href='#comments' className="gap-2 inline-flex items-center">
          <span className="text-blue-300">
            <IconMessage />
          </span>
          <span className="text-blue-500 text-sm">{0}</span>
        </Button>
      </div>
    </section>
  );
};

export const CommentList: React.FC<CommentListAttributes> = ({
  comments,
}: CommentListAttributes) => {
  return (
    <div className="flex flex-col gap-4">
      {comments.map((comment, index) => (
        <Fragment key={comment.id}>
          <Comment {...comment} />
          {index < comments.length - 1 && <hr />}
        </Fragment>
      ))}
    </div>
  );
};

export const CommentForm: React.FC = () => {
  return (
    <section className='flex flex-col gap-4'>
      <FormGroup type="editor" placeholder="Enter comments" />
      <div className="text-right">
        <Button colorScheme="blue" size="md">
          Submit
        </Button>
      </div>
    </section>
  );
};
