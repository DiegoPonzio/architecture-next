'use client';

import useSWR from 'swr';
import type { UserDto } from '@/interface/user-dto.ts';
import { apiGetAction } from '@/app/actions/api.actions';

export function useAuth() {
  return useSWR(
    '/auth/me',
    async () => {
      const data = await apiGetAction<UserDto>('/auth/me');

      // si hay un error se lanza
      if (data.error) {
        throw new Error(data.error);
      }

      return data.data;
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    },
  );
}
