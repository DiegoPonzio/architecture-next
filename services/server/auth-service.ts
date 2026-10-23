import type { LoginResponse } from '@/interface/login-response';
import type { LoginCredentials } from '@/interface/login-credentials';
import type { IAuthService, SignUpCredentials } from '@/services/core/interfaces';
import { apiClient } from '@/services/api/client';
import { destroySession, getSessionToken } from '@/services/auth/session';

export class AuthService implements IAuthService {
  /**
   * Inicia sesión.
   *
   * El token recibido se almacena mediante
   * ServerApiClient / TokenStorage.
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);

    return response;
  }

  /**
   * Registra un nuevo usuario.
   */
  async signUp(credentials: SignUpCredentials): Promise<void> {
    await apiClient.post('/auth/register', credentials);
  }

  /**
   * Cierra la sesión.
   */
  async logout(): Promise<void> {
    await destroySession();
  }

  /**
   * Comprueba si el usuario está autenticado.
   */
  async isAuthenticated(): Promise<boolean> {
    return !!(await getSessionToken());
  }
}
