import dynamic from 'next/dynamic';

export const InputEditor = dynamic(
  () => import('./InputEditor'),
  { ssr: false }
);

export { InputSelect } from './InputSelect';
export { InputAutocomplete } from './InputAutocomplete';
