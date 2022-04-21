import { HTMLAttributes } from 'react';

export const Code: React.FC = ({ children }: HTMLAttributes<HTMLElement>) => {
  return (
    <code className="bg-gray-200 border border-gray-300 font-bold inline-block px-2 rounded">
      {children}
    </code>
  );
};
