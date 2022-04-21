import { RawDraftContentState } from 'draft-js';
import { FormEvent, FormHTMLAttributes, HTMLAttributes, useMemo } from 'react';
import { FormFieldNormalized } from '../../hooks/form';
import { Input, InputAttributes, InputTextarea } from './input';
import { InputAutocomplete, InputSelect, InputEditor } from './input/index';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FormAttributes extends FormHTMLAttributes<HTMLFormElement> {
  onSubmit?: () => void;
}

export interface FormGroupAttributes extends HTMLAttributes<HTMLElement> {
  field?: FormFieldNormalized;
  label?: string;
  max?: number;
  options?: Array<string>;
  suggestions?: Array<string>;
  type?:
    | 'autocomplete'
    | 'editor'
    | 'email'
    | 'password'
    | 'search'
    | 'select'
    | 'tags'
    | 'text'
    | 'textarea';
  value?: unknown;
  variant?: InputAttributes['variant'];
  onChange?: (value: unknown) => void;
  onEditorStateChange?: (value: RawDraftContentState) => void;
}

export const Form = ({ children, className, onSubmit }: FormAttributes) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.();
  };
  return (
    <form className={className} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export const FormGroup = ({
  field,
  id,
  label,
  options,
  type = 'text',
  value,
  onChange,
  ...props
}: FormGroupAttributes) => {
  const errors = useMemo(() => {
    return [...(field?.errors || []), ...(field?.serverErrors || [])];
  }, [field]);

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="block">
          {label}
        </label>
      )}
      {(() => {
        switch (type) {
          case 'autocomplete':
            return (
              <InputAutocomplete
                {...{ ...props, options, onChange, value: value as string }}
              />
            );
          case 'editor':
            return (
              <InputEditor
                {...{ ...props, id, onChange, value: value as string }}
              />
            );
          case 'select':
            return <InputSelect {...{ ...props, options }} />;
          case 'textarea':
            return (
              <InputTextarea
                {...{ ...props, value: value as string, onChange }}
              />
            );
          case 'text':
          default:
            return (
              <Input
                {...{ ...props, id, type, value: value as string, onChange }}
              />
            );
        }
      })()}
      {!!errors.length && (
        <ul className="flex flex-col gap-2">
          {errors.map((error, index) => (
            <li key={index} className="font-medium text-xs text-red-500">
              {error.toUpperCase()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
