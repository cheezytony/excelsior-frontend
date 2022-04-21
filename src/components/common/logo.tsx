import Link from 'next/link';
import { IconTelevision } from './icons';

export const Logo = () => {
  return (
    <Link href="/">
      <a className={'gap-2 inline-flex items-end whitespace-nowrap'}>
        <span className="text-blue-200 dark:text-blue-400">
          <IconTelevision height={48} width={48} />
        </span>
        <span className="font-black text-gray-600 text-2xl dark:text-gray-300">
          Excelsior
        </span>
      </a>
    </Link>
  );
};