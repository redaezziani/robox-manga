'use server';
// lib/auth.ts
import { cookies } from 'next/headers';

export const getServerSideAuthToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get('auth_token')?.value;
};

export const isAuthenticated = async () => {
  const token = await getServerSideAuthToken();
  return !!token;
};

export const createServerSideToken = async (value: string) => {
  const cookiesStore = await cookies();
  cookiesStore.set('auth_token', value, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });
};
