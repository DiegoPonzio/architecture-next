import { z } from 'zod';

export const loginSchema = z.object({
  login: z.string().min(1, 'El usuario o correo es requerido'),

  password: z.string().min(1, 'La contraseña es requerida').min(6, 'Mínimo 6 caracteres'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
