'use server';

import { redirect } from 'next/navigation';
import { loginSchema } from '@/schema/login-schema';
import { signUpSchema, type SignUpFormData } from '@/schema/sign-up-schema';
import { createSession } from '@/services/auth/session';
import { AuthService } from '@/services/server';
import { apiClient } from '@/services/api/client';

export type LoginState = {
  error?: string;
};

export type AuthActionState = {
  error?: string;
  success?: string;
};

function createAuthService() {
  return new AuthService();
}

/**
 * Iniciar sesión
 */
export async function loginAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const login = String(formData.get('login') ?? '');

  const password = String(formData.get('password') ?? '');

  const validation = loginSchema.safeParse({
    login,
    password,
  });

  if (!validation.success) {
    return {
      error: validation.error.issues[0]?.message ?? 'Datos inválidos',
    };
  }

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login);

  try {
    console.log('🚀 ~ file: auth.actions.ts:55 ~ loginAction ~ login:', login);
    const authService = createAuthService();

    const response = await authService.login({
      email: isEmail ? login : undefined,
      username: isEmail ? undefined : login,
      password,
    });

    console.log('🚀 ~ file: auth.actions.ts:61 ~ loginAction ~ response:', response);

    await createSession(response.token);
    apiClient.setBearerToken(response.token);
  } catch (error) {
    console.log('🚀 ~ file: auth.actions.ts:66 ~ loginAction ~ error:', error);
    return {
      error: error instanceof Error ? error.message : 'Credenciales inválidas',
    };
  }

  // await mutate('/auth/me', undefined, { revalidate: true });
  redirect('/', 'replace');
}

/**
 * Crear cuenta
 */
export async function signUpAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const data: SignUpFormData = {
    email: String(formData.get('email') ?? '').trim(),

    username: String(formData.get('username') ?? '').trim(),

    password: String(formData.get('password') ?? ''),

    copyPassword: String(formData.get('copyPassword') ?? ''),
  };

  const validation = signUpSchema.safeParse(data);

  if (!validation.success) {
    return {
      error: validation.error.issues[0]?.message ?? 'Datos inválidos',
    };
  }

  try {
    const authService = createAuthService();

    await authService.signUp({
      email: data.email,
      username: data.username,
      password: data.password,
    });
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'No fue posible crear la cuenta.',
    };
  }

  redirect('/login', 'replace');
}
