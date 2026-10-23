'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, type SignUpFormData } from '@/schema/sign-up-schema';
import { signUpAction } from '@/app/actions/auth.actions';
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
import { redirect } from 'next/navigation';

export function SignUpForm() {
  const [apiError, setApiError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: SignUpFormData) => {
    setApiError('');

    const formData = new FormData();

    formData.append('email', data.email);
    formData.append('username', data.username);
    formData.append('password', data.password);
    formData.append('copyPassword', data.copyPassword);

    const result = await signUpAction({}, formData);

    if (result?.error) {
      setApiError(result.error);
      return;
    }

    if (result?.success) {
      // Aquí puedes redirigir o mostrar un mensaje.
      redirect('/login#created', 'replace');
      console.log(result.success);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex h-screen items-center justify-center px-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Crea tu cuenta</CardTitle>

            <CardDescription>Completa tus datos para comenzar</CardDescription>

            <CardAction>
              <Button asChild variant="link">
                <Link href="/login">Login</Link>
              </Button>
            </CardAction>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-6">
              {/* EMAIL */}
              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>

                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  aria-invalid={!!errors.email}
                  disabled={isSubmitting}
                  {...register('email')}
                />

                {errors.email && (
                  <FieldDescription className="text-destructive">
                    {errors.email.message}
                  </FieldDescription>
                )}
              </Field>

              {/* USERNAME */}
              <Field data-invalid={!!errors.username}>
                <FieldLabel htmlFor="username">Nombre de usuario</FieldLabel>

                <Input
                  id="username"
                  type="text"
                  placeholder="mi_usuario"
                  aria-invalid={!!errors.username}
                  disabled={isSubmitting}
                  {...register('username')}
                />

                {errors.username && (
                  <FieldDescription className="text-destructive">
                    {errors.username.message}
                  </FieldDescription>
                )}
              </Field>

              {/* PASSWORD */}
              <Field data-invalid={!!errors.password}>
                <FieldLabel htmlFor="password">Contraseña</FieldLabel>

                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  aria-invalid={!!errors.password}
                  disabled={isSubmitting}
                  {...register('password')}
                />

                {errors.password && (
                  <FieldDescription className="text-destructive">
                    {errors.password.message}
                  </FieldDescription>
                )}
              </Field>

              {/* CONFIRM PASSWORD */}
              <Field data-invalid={!!errors.copyPassword}>
                <FieldLabel htmlFor="copyPassword">Confirmar contraseña</FieldLabel>

                <Input
                  id="copyPassword"
                  type="password"
                  placeholder="••••••••"
                  aria-invalid={!!errors.copyPassword}
                  disabled={isSubmitting}
                  {...register('copyPassword')}
                />

                {errors.copyPassword && (
                  <FieldDescription className="text-destructive">
                    {errors.copyPassword.message}
                  </FieldDescription>
                )}
              </Field>

              {/* API ERROR */}
              {apiError && <p className="text-sm text-destructive">{apiError}</p>}
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
            </Button>

            <Button type="button" variant="outline" className="w-full" disabled={isSubmitting}>
              Sign up with Google
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
