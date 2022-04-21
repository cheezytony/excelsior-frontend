import { RawDraftContentState } from 'draft-js';
import { useContext } from 'react';
import { NewPostContext } from '../../../../contexts/NewPostContext';
import { toSentenceCase } from '../../../../utils/filters';
import { FormGroup } from '../../../common/form';

const NewPostBody: React.FC = () => {
  const {
    form: { fields, updateField },
  } = useContext(NewPostContext);

  const handleStateChange = (state: RawDraftContentState) => {
    const { blocks } = state;
    updateField('preview', blocks[0]?.text || '');
  };
  
  return (
    <FormGroup
      field={fields.body}
      id="body"
      max={5000}
      placeholder="Tell your story..."
      type="editor"
      value={fields.body.value}
      onChange={(value: string) => updateField('body', toSentenceCase(value))}
      onEditorStateChange={handleStateChange}
    />
  );
};

export default NewPostBody;