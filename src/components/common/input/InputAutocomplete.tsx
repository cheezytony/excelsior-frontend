import { Combobox } from '@headlessui/react';
import { Fragment, useMemo, useState } from 'react';
import { getTheme, InputAttributes } from '../input';

export interface InputAutocompleteAttributes {
  options?: Array<string>;
  placeholder?: string;
  value?: string;
  variant?: InputAttributes['variant'];
  onChange?: (tags: string) => void;
}

export const InputAutocomplete: React.FC<InputAutocompleteAttributes> = ({
  options = [],
  placeholder,
  value,
  variant,
  onChange,
}: InputAutocompleteAttributes) => {
  const [query, setQuery] = useState('');
  const theme = useMemo(() => getTheme(variant, 'px-6 py-4'), [variant]);

  const filteredSuggestions = useMemo(() => {
    const filteredSuggestions = options.filter((option) => {
      return option.toLowerCase().includes(query.toLowerCase()) || !query;
    });
    return filteredSuggestions.length
      ? filteredSuggestions
      : query
      ? [query]
      : [];
  }, [options, query]);

  return (
    <Combobox
      value={value}
      onChange={(value: string) => {
        setQuery('');
        onChange?.(value);
      }}
    >
      <div className="relative">
        <Combobox.Input
          autoComplete="off"
          className={`block duration-300 min-h-[56px] outline-none w-full ${theme}`}
          displayValue={() => query}
          placeholder={placeholder}
          onChange={({ target: { value } }) => setQuery(value)}
        />
        <Combobox.Options className="absolute bg-white left-0 p-1 mt-2 ring-1 ring-blue-50 rounded shadow-xl text-base top-full w-full z-[999]">
          {filteredSuggestions.length ? (
            filteredSuggestions.map((option) => (
              <Combobox.Option key={option} value={option} as={Fragment}>
                {({ active }) => (
                  <li
                    className={`cursor-pointer py-2 px-5 text-sm hover:bg-blue-50 ${
                      active && 'bg-blue-50'
                    }`}
                  >
                    {option}
                  </li>
                )}
              </Combobox.Option>
            ))
          ) : (
            <div className="px-5 py-2 text-gray-500">Nothing found.</div>
          )}
        </Combobox.Options>
      </div>
    </Combobox>
  );
};
