import {
  ChangeEvent,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useMemo,
} from 'react';

export interface InputAttributes extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'block' | 'flush' | 'solid' | 'outline';
}
export interface InputTextareaAttributes
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: InputAttributes['variant'];
}
export interface InputCheckboxAttributes {
  checked?: boolean;
  defaultChecked?: boolean;
  id?: string;
  label?: string;
  onChange?: (checked: boolean) => void;
}

export const getTheme = (
  variant?: InputAttributes['variant'],
  padding = 'px-6 py-4'
) => {
  switch (variant) {
    case 'solid':
      return 'duration-300 px-4 py-4 ring-1 ring-blue-100 rounded focus:bg-blue-50 focus:ring-transparent focus-within:bg-blue-50 focus-within:ring-transparent';

    case 'flush':
      return 'text-2xl py-4';

    case 'outline':
    default:
      return `duration-300 ring-1 ring-gray-400 ${padding} rounded focus:ring-2 focus:ring-blue-300`;
  }
};

const handleInputChange = ({
  target: { value },
}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, onChange?: (value: unknown) => void) => {
  onChange?.(value);
};

export const Input: React.FC<InputAttributes> = ({
  variant = 'outline',
  onChange,
  ...props
}: InputAttributes) => {
  const theme = useMemo(() => getTheme(variant), [variant]);

  return (
    <input
      {...props}
      className={`block duration-300 outline-none w-full ${theme}`}
      onChange={(e) => handleInputChange(e, onChange)}
    />
  );
};

export const InputTextarea: React.FC<InputTextareaAttributes> = ({
  variant = 'outline',
  onChange,
  ...props
}: InputTextareaAttributes) => {
  const theme = useMemo(() => getTheme(variant), [variant]);

  return (
    <textarea
      {...props}
      className={`block duration-300 min-h-[20rem] outline-none resize-none w-full ${theme}`}
      onChange={(e) => handleInputChange(e, onChange)}
    ></textarea>
  );
};

export const InputCheckbox: React.FC<InputCheckboxAttributes> = ({
  checked,
  defaultChecked,
  id,
  label,
  onChange,
}: InputCheckboxAttributes) => {
  return (
    <div className="flex items-center">
      <label htmlFor={id} className="inline-flex items-center">
        <input
          id={id}
          type="checkbox"
          className="hidden peer"
          defaultChecked={defaultChecked}
          checked={checked}
          onChange={({ target: { checked: isChecked } }) =>
            onChange?.(isChecked)
          }
        />
        <span className="h-5 w-5 border-gray-300 inline-block ring-1 ring-gray-500 rounded text-indigo-600 focus:ring-indigo-500 peer-checked:bg-indigo-500"></span>
        <span className="ml-3 min-w-0 flex-1 text-gray-500">{label}</span>
      </label>
    </div>
  );
};
