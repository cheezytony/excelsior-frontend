import { ReactNode, useMemo } from 'react';

export interface MessageAttributes {
  children?: ReactNode;
  status?: 'error' | 'info' | 'success' | 'warning';
}

export function Message({ children, status = 'info' }: MessageAttributes) {
  const theme = useMemo(() => {
    switch (status) {
      case 'error':
        return 'bg-red-500 text-white';
      case 'info':
      default:
        return '';
    }
  }, [status]);
  return <div className={`px-6 py-3 rounded text-sm ${theme}`}>{children}</div>;
}
