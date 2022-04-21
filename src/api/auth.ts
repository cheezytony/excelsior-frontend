import { apiRequest } from '.';
import { getToken } from '../hooks/auth';
import { UserModel } from '../types/models';

export function register({
  first_name,
  last_name,
  email,
  phone,
  password,
}: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
}) {
  return apiRequest({
    method: 'POST',
    url: '/register',
    data: {
      first_name,
      last_name,
      email,
      phone,
      password,
    },
  });
}

export function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return apiRequest<{ data: { token: string, user: UserModel } }>({
    method: 'POST',
    url: '/login',
    data: {
      email,
      password,
    },
  });
}

export function logout() {
  return apiRequest({
    method: 'POST',
    url: '/logout',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}


export function getAuthenticatedUser(token: string) {
  return apiRequest<{ data: { user: UserModel } }>({
    method: 'GET',
    url: '/profile',
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
}
