import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { getSession } from '../hooks/auth';
import { UserModel } from '../types/models';

export const AuthenticationContext = createContext<{
  isLoading: boolean;
  isLoggedIn: boolean;
  token: string;
  user: UserModel;
  reAuthenticate?: () => Promise<void>;
  setIsLoggedIn?: Dispatch<SetStateAction<boolean>>;
  setToken?: Dispatch<SetStateAction<string>>;
  setUser?: Dispatch<SetStateAction<UserModel>>;
}>({
  isLoading: false,
  isLoggedIn: false,
  token: null,
  user: null,
});

export function AuthenticationContextWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string>(null);
  const [user, setUser] = useState<UserModel>(null);

  const reAuthenticate = async () => {
    setIsLoading(true);
    const session = await getSession();
    setIsLoading(false);
    if (session) {
      setIsLoggedIn(true);
      setUser(session.user);
      setToken(session.token);
    }
  };

  useEffect(() => {
    reAuthenticate();
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        token,
        user,
        reAuthenticate,
        setIsLoggedIn,
        setToken,
        setUser,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}
