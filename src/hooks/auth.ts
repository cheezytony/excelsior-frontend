import { getCookie, removeCookies, setCookies } from 'cookies-next';
import { IncomingMessage } from 'http';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import Router, { useRouter } from 'next/router';
import { useContext } from 'react';
import { getAuthenticatedUser, login, logout, register } from '../api/auth';
import { tokenKey } from '../config/auth';
import { AuthenticationContext } from '../contexts/AuthenticationContext';
import { UserModel } from '../types/models';

type IncomingRequest = IncomingMessage & {
  cookies: NextApiRequestCookies;
};

export const getSession = async (req?: IncomingRequest) => {
  let user: UserModel;
  const token: string = getToken(req);

  if (token) {
    await getAuthenticatedUser(token)
      .then(({ data }) => {
        user = data.user;
      })
      .catch((error) => {
        removeCookies(tokenKey);
        console.log(error);
      });
  }

  return token && user ? { user, token } : null;
};

export const getToken = (req?: IncomingRequest): string => {
  const token = getCookie(tokenKey, req && { req });
  return token?.toString();
};

export const useSession = () => {
  return useContext(AuthenticationContext);
};

export const useLogin = () => {
  const { query: { redirectTo } } = useRouter();
  const { setIsLoggedIn, setToken, setUser } = useSession();
  return async (credentials: { email: string; password: string }) => {
    return await login(credentials)
      .then(({ data: { token, user } }) => {
        setToken(token);
        setUser(user);
        setCookies(tokenKey, token);
        Router.push((redirectTo as string) || '/');
        setIsLoggedIn(true);
      });
  };
};

export const useLogout = () => {
  const { setIsLoggedIn, setToken, setUser } = useSession();
  return async () => {
    await logout();
    setToken(null), setUser(null), setIsLoggedIn(false);
    removeCookies(tokenKey);
  };
};

export const useRegister = () => {
  const { setIsLoggedIn, setToken, setUser } = useSession();
  return async (credentials: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    return await register(credentials)
      .then(({ data: { token, user } }) => {
        setToken(token);
        setUser(user);
        setCookies(tokenKey, token);
        Router.push('/');
        setIsLoggedIn(true);
      });
  };
};

