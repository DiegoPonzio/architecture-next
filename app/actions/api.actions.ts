'use server';

import { apiClient } from '@/services/api/client';

type ApiResponse<T> = {
  data?: T;
  error?: string;
  status: number;
};

export async function apiGetAction<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const data = await apiClient.get<T>(endpoint);

    return {
      data,
      status: 200,
    };
  } catch (error: unknown) {
    console.error('apiGetAction:', error);

    return {
      error: error instanceof Error ? error.message : 'Error desconocido',
      status: 500,
    };
  }
}
