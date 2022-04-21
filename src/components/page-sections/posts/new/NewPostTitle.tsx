import { useContext } from 'react';
import { NewPostContext } from '../../../../contexts/NewPostContext';
import { toSentenceCase } from '../../../../utils/filters';
import { FormGroup } from '../../../common/form';

export default function NewPostTitle() {
  const {
    form: { fields, updateField },
  } = useContext(NewPostContext);

  fields.tags.value;
  return (
    <FormGroup
      field={fields.title}
      id="title"
      max={100}
      placeholder="Enter an awesome post title...."
      type="textarea"
      value={fields.title.value}
      onChange={(value: string) => {
        updateField('title', toSentenceCase(value));
      }}
    />
  );
}
