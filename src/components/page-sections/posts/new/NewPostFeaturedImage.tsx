import { useContext, useEffect, useState } from 'react';
import { NewPostContext } from '../../../../contexts/NewPostContext';
import { Dropzone } from '../../../common/dropzone';

export default function NewPostFeaturedImage() {
  const {
    form: { fields, updateField },
    setFeaturedImagePreview
  } = useContext(NewPostContext);
  const [fileReader] = useState<FileReader>(() => new FileReader());
  const handleFileReaderLoad = (event: ProgressEvent<FileReader>) => {
    setFeaturedImagePreview(event.target.result as string);
  };

  useEffect(() => {
    fileReader.addEventListener('load', handleFileReaderLoad);
    return () => {
      fileReader.removeEventListener('load', handleFileReaderLoad);
    };
  }, []);

  return (
    <div>
      <Dropzone
        accept={['.jpg', '.jpeg', '.png']}
        title="Select an image to capture the essence of your story..."
        value={fields.featured_image.value && [fields.featured_image.value as File]}
        onChange={([file]) => {
          updateField('featured_image', file);
          fileReader.readAsDataURL(file);
        }}
      />
    </div>
  );
}
