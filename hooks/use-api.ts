'use client';

import useSWR, { type SWRConfiguration } from 'swr';

import { apiGetAction } from '@/app/actions/api.actions';

async function apiFetcher<T>(url: string): Promise<T> {
  const response = await apiGetAction<T>(url);

  if (response.error) {
    throw new Error(response.error);
  }

  return response.data as T;
}

export function useApi<T>(url: string, options?: SWRConfiguration<T>) {
  return useSWR<T>(url, apiFetcher, options);
}
