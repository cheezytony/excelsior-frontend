import { useContext } from 'react';
import { NewPostContext } from '../../../../contexts/NewPostContext';
import { Form } from '../../../common/form';

const NewPostForm: React.FC = () => {
  const { component, handleSubmit } = useContext(NewPostContext);

  return (
    <Form onSubmit={handleSubmit}>
      <div className="min-h-[20rem]">{component}</div>
    </Form>
  );
};

export default NewPostForm;
