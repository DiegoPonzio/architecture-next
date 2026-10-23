'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormData, loginSchema } from '@/schema/login-schema';
import { loginAction } from '@/app/actions/auth.actions';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { mutate } from 'swr';

export function LoginForm() {
  const [apiError, setApiError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    // Validar mientras escribe
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormData) => {
    setApiError('');

    const formData = new FormData();

    formData.append('login', data.login);
    formData.append('password', data.password);

    const result = await loginAction({}, formData);

    await mutate('/auth/me');

    if (result?.error) {
      console.error(result?.error);
      setApiError(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex h-screen items-center justify-center px-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Inicia sesión en tu cuenta</CardTitle>

            <CardDescription>Ingresa tu correo o nombre de usuario</CardDescription>

            <CardAction>
              <Button asChild variant="link">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </CardAction>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-6">
              {/* LOGIN */}
              <Field data-invalid={!!errors.login}>
                <FieldLabel htmlFor="login">Correo/Nombre de usuario</FieldLabel>

                <Input
                  id="login"
                  type="text"
                  placeholder="m@example.com/me"
                  aria-invalid={!!errors.login}
                  {...register('login')}
                />

                {errors.login && (
                  <FieldDescription className="text-destructive">
                    {errors.login.message}
                  </FieldDescription>
                )}
              </Field>

              {/* PASSWORD */}
              <Field data-invalid={!!errors.password}>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Contraseña</FieldLabel>

                  <Link
                    href="/forgot-password"
                    className="ml-auto text-xs underline-offset-4 hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                <Input
                  id="password"
                  type="password"
                  aria-invalid={!!errors.password}
                  {...register('password')}
                />

                {errors.password && (
                  <FieldDescription className="text-destructive">
                    {errors.password.message}
                  </FieldDescription>
                )}
              </Field>

              {/* ERROR DEL BACKEND */}
              {apiError && <p className="text-sm text-destructive">{apiError}</p>}
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Iniciando sesión...' : 'Login'}
            </Button>

            <Button type="button" variant="outline" className="w-full">
              Login with Google
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
