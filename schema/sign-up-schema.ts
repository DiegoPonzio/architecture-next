import { z } from 'zod';

export const signUpSchema = z
  .object({
    email: z.string().min(1, 'El correo es requerido').email('Correo electrónico inválido'),

    username: z
      .string()
      .min(3, 'El usuario debe tener al menos 3 caracteres')
      .max(30, 'El usuario no puede exceder 30 caracteres')
      .regex(
        /^[a-zA-Z0-9_-]+$/,
        'El usuario solo puede contener letras, números, guion bajo (_) y guion medio (-)',
      ),

    password: z
      .string()
      .min(1, 'La contraseña es requerida')
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .max(100, 'La contraseña no puede exceder 100 caracteres')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
        'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial',
      ),

    copyPassword: z.string().min(1, 'Debes confirmar la contraseña'),
  })
  .refine((data) => data.password === data.copyPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['copyPassword'],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
