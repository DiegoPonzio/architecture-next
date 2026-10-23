import { destroySession, getSessionToken } from '@/services/auth/session';
import { redirect } from 'next/navigation';

class ServerApiClient {
  private readonly baseUrl: string;
  private headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  constructor() {
    this.baseUrl = process.env.API_URL || '';

    if (!this.baseUrl) {
      throw new Error('API_URL no está configurada');
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
    });
  }

  async post<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  async put<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }

  private getHeaders(): Record<string, string> {
    return this.headers;
  }

  private async request<T>(endpoint: string, options: RequestInit): Promise<T> {
    // se pone el token
    const token = await getSessionToken();
    if (token) this.setBearerToken(token);

    const headers = this.getHeaders();

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
      cache: 'no-store',
    });

    return this.handleResponse<T>(response);
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const text = await response.text();

    let data: unknown = null;

    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }
    }

    if (!response.ok) {
      throw new Error(this.getErrorMessage(data, response.statusText));
    }

    return data as T;
  }

  private getErrorMessage(data: unknown, fallback: string): string {
    // 401 = sesión no autorizada
    if (fallback === 'Unauthorized') {
      this.handleSessionExpired();
      return 'Tu sesión ha expirado.';
    }

    // exp dentro de la respuesta
    if (this.isTokenExpired(data)) {
      this.handleSessionExpired();
      return 'Tu sesión ha expirado.';
    }

    if (typeof data === 'object' && data !== null && 'message' in data) {
      const message = (data as { message?: unknown }).message;

      if (Array.isArray(message)) {
        return message.join(', ');
      }

      if (typeof message === 'string') {
        return message;
      }
    }

    if (typeof data === 'string' && data) {
      return data;
    }

    return fallback || 'Error en la petición';
  }

  private isTokenExpired(data: unknown): boolean {
    if (typeof data !== 'object' || data === null || !('exp' in data)) {
      return false;
    }

    const exp = (data as { exp?: unknown }).exp;

    if (typeof exp !== 'number') {
      return false;
    }

    // exp viene en segundos Unix
    return exp <= Math.floor(Date.now() / 1000);
  }

  private handleSessionExpired(): void {
    destroySession();
    this.clearBearerToken();

    if (typeof window !== 'undefined') {
      redirect('/login#expired', 'replace');
    }
  }

  setHeader(key: string, value: string): void {
    this.headers = {
      ...this.headers,
      [key]: value,
    };
  }

  removeHeader(key: string): void {
    const headers: Record<string, string> = { ...this.headers };
    delete headers[key];
    this.headers = headers;
  }

  setBearerToken(token?: string): void {
    delete this.headers['Authorization'];

    if (!token) {
      return;
    }

    this.setHeader('Authorization', `Bearer ${token}`);
  }

  clearBearerToken(): void {
    this.removeHeader('Authorization');
  }
}

export const apiClient = new ServerApiClient();
