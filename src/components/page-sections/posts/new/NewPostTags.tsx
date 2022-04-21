import { useContext, useMemo } from 'react';
import { NewPostContext } from '../../../../contexts/NewPostContext';
import { FormGroup } from '../../../common/form';
import { Tag } from '../../../common/tag';

export default function NewPostTags() {
  const {
    form: { fields, updateField },
  } = useContext(NewPostContext);
  const tags = fields.tags.value as Array<string>;

  const options = useMemo(
    () =>
      [
        'Android',
        'Art',
        'Blockchain',
        'Business',
        'Career',
        'Css',
        'Data Science',
        'Devops',
        'Discuss',
        'Javascript',
        'Laravel',
        'Linux',
        'Machine Learning',
        'Mindfulness',
        'Mobile',
        'Money',
        'Open Source',
        'Php',
        'Productivity',
        'Psychology',
        'React',
        'Security',
        'Technology',
        'Testing',
        'Typescript',
        'Vue',
      ].filter((option) => !tags.includes(option)),
    [tags]
  );

  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      updateField('tags', [...tags, tag]);
    }
  };
  const removeTag = (tag) => {
    const t = [...tags];
    t.splice(t.indexOf(tag), 1);
    updateField('tags', t);
  };

  return (
    <div className="flex flex-col gap-4">
      <FormGroup
        field={fields.tags}
        label="Select 3 or more tags that describe your story..."
        placeholder="Enter a new tag"
        options={options}
        type="autocomplete"
        value={fields.tags.value as Array<string>}
        variant="solid"
        onChange={(value: string) => addTag(value)}
      />
      <div className="flex flex-wrap gap-2">
        {(fields.tags.value as Array<string>).map(
          (topic: string, index: number) => (
            <Tag key={index} onClick={() => removeTag(topic)}>
              {topic}
            </Tag>
          )
        )}
      </div>
    </div>
  );
}
