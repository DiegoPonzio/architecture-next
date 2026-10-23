import { cookies } from 'next/headers';

const TOKEN_COOKIE = 'access_token';

export async function createSession(token: string) {
  const cookieStore = await cookies();

  cookieStore.set(TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getSessionToken() {
  const cookieStore = await cookies();

  return cookieStore.get(TOKEN_COOKIE)?.value;
}

export async function destroySession() {
  const cookieStore = await cookies();

  cookieStore.delete(TOKEN_COOKIE);
}
