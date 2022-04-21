import { useContext } from 'react';
import { NewPostContext } from '../../../../contexts/NewPostContext';
import { Button } from '../../../common/button';

const NewPostActions: React.FC = () => {
  const { form, step, handleSubmit, next, prev } = useContext(NewPostContext);

  return (
    <div className="flex gap-16 items-center justify-end">
      {step > 0 && (
        <Button isDisabled={form.isLoading} onClick={prev}>
          Go Back
        </Button>
      )}
      {step >= 5 ? (
        <Button
          colorScheme="black"
          size="md"
          type="submit"
          onClick={handleSubmit}
          isLoading={form.isLoading}
        >
          Publish your story.
        </Button>
      ) : (
        <Button colorScheme="black" size="md" onClick={next}>
          Next Step
        </Button>
      )}
    </div>
  );
};

export default NewPostActions;
