import { useRouter } from 'next/router';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from 'react';
import NewPostBody from '../components/page-sections/posts/new/NewPostBody';
import NewPostFeaturedImage from '../components/page-sections/posts/new/NewPostFeaturedImage';
import NewPostPreview from '../components/page-sections/posts/new/NewPostPreview';
import NewPostTags from '../components/page-sections/posts/new/NewPostTags';
import NewPostTitle from '../components/page-sections/posts/new/NewPostTitle';
import NewPostTopic from '../components/page-sections/posts/new/NewPostTopic';
import { FormFieldNormalized, FormNormalized, useForm } from '../hooks/form';
import { useCreatePost } from '../hooks/post';

export const NewPostContext = createContext<{
  component?: JSX.Element;
  form?: FormNormalized<{
    title: FormFieldNormalized<string>;
    body: FormFieldNormalized<string>;
    topic: FormFieldNormalized<string>;
    tags: FormFieldNormalized<Array<string>>;
    featured_image: FormFieldNormalized<string>;
    preview: FormFieldNormalized<string>;
  }>;
  featuredImagePreview?: string;
  step?: number;
  handleSubmit?: () => boolean;
  next?: () => void;
  prev?: () => void;
  setFeaturedImagePreview?: Dispatch<SetStateAction<string>>;
  setStep?: Dispatch<SetStateAction<number>>;
  validateFields?: (step: number) => boolean;
}>({});

export function NewPostContextWrapper({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element {
  const form = useForm({
    title: {},
    body: {},
    topic: {},
    tags: { value: [], rules: ['arrayMin:3'] },
    featured_image: { rules: ['nullable'] },
    preview: {},
  });
  const [featuredImagePreview, setFeaturedImagePreview] =
    useState<string>(null);
  const [step, setStep] = useState<number>(0);
  const router = useRouter();
  const createPost = useCreatePost();
  const steps = useMemo<JSX.Element[]>(() => {
    return [
      <NewPostTitle key="NewPostTitle" />,
      <NewPostBody key="NewPostBody" />,
      <NewPostFeaturedImage key="NewPostFeaturedImage" />,
      <NewPostTopic key="NewPostTopic" />,
      <NewPostTags key="NewPostTags" />,
      <NewPostPreview key="NewPostPreview" />,
    ];
  }, [form]);
  const component = useMemo<JSX.Element>(() => steps[step], [step, steps]);
  const next = () =>
    validateFields(step) && setStep(step >= steps.length - 1 ? step : step + 1);
  const prev = () => setStep(step <= 0 ? step : step - 1);
  const validateFields = (step: number): boolean => {
    switch (step) {
      case 1:
        return form.validateField(form.fields.body);
      case 2:
        return form.validateField(form.fields.featured_image);
      case 3:
        return form.validateField(form.fields.topic);
      case 4:
        return form.validateField(form.fields.tags);
      case 0:
      default:
        return form.validateField(form.fields.title);
    }
  };
  const handleSubmit = () => {
    if (!form.validateForm()) return false;

    form.setIsLoading(true);
    createPost(form.toFormData())
      .then(() => {
        router.push('/');
      })
      .catch((error) => console.log(error))
      .finally(() => {
        form.setIsLoading(false);
      });
  };

  return (
    <NewPostContext.Provider
      value={{
        component,
        form,
        featuredImagePreview,
        step,
        next,
        prev,
        setFeaturedImagePreview,
        setStep,
        validateFields,
        handleSubmit,
      }}
    >
      {children}
    </NewPostContext.Provider>
  );
}
