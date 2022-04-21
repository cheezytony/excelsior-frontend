import { useState } from 'react';
import { Form } from './form';
import { IconClose, IconSearch } from './icons';
import { Code } from './typography';

export const SearchForm = () => {
  const [query, setQuery] = useState<string>('');
  const resetQuery = () => setQuery('');

  return (
    <Form>
      <label className="flex gap-4 group items-center max-w-[600px] relative">
        <span className="text-blue-100 group-focus-within:text-blue-400">
          <IconSearch />
        </span>
        <div className="relative w-full">
          <input
            id="blog-header-search-input"
            type="text"
            className="bg-transparent h-[60px] relative text-2xl w-full focus:outline-none dark:text-white dark:placeholder:text-white"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {!query.length && (
            <div className="absolute duration-300 flex gap-4 items-center left-0 opacity-50 pointer-events-none top-1/2 transform -translate-y-1/2 group-focus-within:opacity-0">
              <span>Find the right post for you.</span>
              <Code>/</Code>
            </div>
          )}
        </div>
        <div className="absolute duration-300 flex gap-2 items-center left-0 opacity-0 pointer-events-none text-xs top-full transform -translate-y-2 group-focus-within:opacity-50">
          <Code>esc</Code>
          <span>To Cancel</span>
        </div>
        {!!query.length && (
          <span
            className="cursor-pointer text-blue-100 hover:text-blue-400"
            onMouseDown={resetQuery}
          >
            <IconClose />
          </span>
        )}
      </label>
    </Form>
  );
};
