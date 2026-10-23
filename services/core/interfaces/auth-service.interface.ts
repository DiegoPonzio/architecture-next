import type { LoginResponse } from '@/interface/login-response';
import type { LoginCredentials } from '@/interface/login-credentials';

/**
 * Abstracción para lógica de autenticación
 * Coordina token storage + Api client
 */
export interface IAuthService {
  login(credentials: LoginCredentials): Promise<LoginResponse>;
  logout(): Promise<void>;
  isAuthenticated(): Promise<boolean> | boolean;
}
