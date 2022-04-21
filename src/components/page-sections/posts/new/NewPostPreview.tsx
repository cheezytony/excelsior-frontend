import moment from 'moment';
import { useContext, useMemo } from 'react';
import { NewPostContext } from '../../../../contexts/NewPostContext';
import { useSession } from '../../../../hooks/auth';
import { PostModel } from '../../../../types/models';
import { Post } from '../../../common/post';

export default function NewPostPreview () {
  const {  user } = useSession();
  const { form, featuredImagePreview } = useContext(NewPostContext);

  const preview = useMemo<PostModel>(() => {
    return {
      id: 0,
      title: form.fields.title.value,
      slug: form.fields.title.value,
      body: form.fields.body.value,
      tags: (form.fields.tags.value as Array<string>).map((tag) => ({
        title: tag,
        slug: tag,
      })),
      featured_image: featuredImagePreview || '',
      user,
      user_id: user.id,
      topic: {
        title: form.fields.topic.value
      },
      comments_count: 0,
      comments: [],
      created_at: moment().format(),
      updated_at: moment().format(),
      deleted_at: null,
    } as PostModel;
  }, [form.fields]);

  return (
    <div>
      <Post {...preview} status="preview" />
    </div>
  );
}
