import { z } from 'zod';

export const newTeamSchema = z.object({
  teamName: z
    .string()
    .min(1, 'El nombre del equipo es requerido')
    .max(10, 'El nombre del equipo no puede exceder 10 caracteres'),

  shortDescription: z
    .string()
    .min(1, 'La descripción corta del equipo es requerida')
    .max(40, 'La descripción corta del equipo no puede exceder 40 caracteres'),

  description: z
    .string()
    .min(1, 'La descripción del equipo es requerida')
    .max(500, 'La descripción del equipo no puede exceder 500 caracteres'),
});
