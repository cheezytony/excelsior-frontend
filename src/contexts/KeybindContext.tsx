import { useRouter } from 'next/router';
import { createContext, ReactNode, useEffect, useMemo } from 'react';
import { useLogout, useSession } from '../hooks/auth';

export const KeybindContext = createContext({});

export function KeybindContextWrapper({ children }: { children: ReactNode }) {
  const router = useRouter();
  const logout = useLogout();
  const { isLoggedIn } = useSession();
  const handleLogout = () => logout();

  const actions = useMemo<
    Record<string, (target: HTMLElement | null, event: KeyboardEvent) => void>
  >(
    () => ({
      '>': (target: HTMLElement, event) => {
        if (target || !event.shiftKey) return;
        event.preventDefault();
        router.push('/');
      },
      '/': (target: HTMLElement) => {
        if (target) return;
        document
          .querySelector<HTMLInputElement>('#blog-header-search-input')
          ?.focus();
      },
      Escape: (target: HTMLElement) => {
        if (!target?.matches('#blog-header-search-input')) return;
        target.blur();
      },
      L: (target: HTMLElement, event) => {
        if (target) return;
        event.preventDefault();
        isLoggedIn ? handleLogout() : router.push('/login');
      },
      N: (target: HTMLElement, event) => {
        if (target) return;
        event.preventDefault();
        router.push('/posts/new');
      },
      P: (target: HTMLElement, event) => {
        if (target) return;
        event.preventDefault();
        router.push('/me');
      },
    }),
    []
  );

  const handleWindowKeys = (event: KeyboardEvent) => {
    const { target, key } = event;
    const action = actions[key];
    action?.(target !== document.body ? (target as HTMLElement) : null, event);
  };

  useEffect(() => {
    window.addEventListener('keyup', handleWindowKeys);
    return () => {
      window.removeEventListener('keyup', handleWindowKeys);
    };
  }, []);

  return (
    <KeybindContext.Provider value={{}}>{children}</KeybindContext.Provider>
  );
}
