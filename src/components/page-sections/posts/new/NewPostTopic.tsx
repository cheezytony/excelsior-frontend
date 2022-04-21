import { useContext, useEffect, useMemo, useState } from 'react';
import { getTopics } from '../../../../api/topics';
import { NewPostContext } from '../../../../contexts/NewPostContext';
import { useApiRequest } from '../../../../hooks/api';
import { TopicModel } from '../../../../types/models';
import { FormGroup } from '../../../common/form';
import { Tag } from '../../../common/tag';

export default function NewPostTopic() {
  const [query, setQuery] = useState<string>('');
  const {
    data = [],
    // isLoading,
    sendRequest,
  } = useApiRequest<Array<TopicModel>>(getTopics, [], {
    transformData: (response) => response.data.data,
  });
  const topics = useMemo(
    () =>
      data.filter((topic) => topic.title.match(new RegExp(query, 'i'))).sort(),
    [data, query]
  );
  const {
    form: { fields, updateField },
  } = useContext(NewPostContext);

  useEffect(() => {
    sendRequest();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <FormGroup
        field={fields.topic}
        label="Select a topic that perfectly categorizes your story..."
        placeholder="Search topics..."
        value={query}
        variant="solid"
        onChange={(value: string) => setQuery(value)}
      />
      <div className="flex flex-wrap gap-2">
        {topics.map((topic, index) => (
          <Tag
            key={index}
            isActive={fields.topic.value === topic.title}
            size="md"
            onClick={() => updateField('topic', topic.title)}
          >
            {topic.title}
          </Tag>
        ))}
      </div>
    </div>
  );
}
