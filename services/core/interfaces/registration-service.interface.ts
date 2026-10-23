/**
 * IRegistrationService - Interfaz para servicios de registro
 * 
 * Principios SOLID aplicados:
 * - SRP: Solo responsable de registro de nuevos usuarios
 * - DIP: Depende de abstracción, no de implementaciones concretas
 * - ISP: Interfaz pequeña y enfocada (no incluye login/logout)
 * 
 * Tipos: Definir en interfaces/ para máxima flexibilidad
 */

export interface SignUpCredentials {
  email: string;
  username: string;
  password: string;
}

export interface SignUpResponse {
  success: boolean;
  message?: string;
  userId?: string;
}

export interface IRegistrationService {
  /**
   * Registra un nuevo usuario
   * @throws Error si el registro falla
   */
  register(credentials: SignUpCredentials): Promise<SignUpResponse>;
}
