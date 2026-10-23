'use server';

import { redirect } from 'next/navigation';
import { destroySession } from '@/services/auth/session';
import { apiClient } from '@/services/api/client';

export async function logoutAction() {
  // se quita la cookie
  await destroySession();
  apiClient.clearBearerToken();

  redirect('/login', 'replace');
}
