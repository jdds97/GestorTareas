import { z } from 'zod';

export const taskSchema = z.object({
  titulo: z.string()
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(200, 'El título no puede tener más de 200 caracteres'),
  
  descripcion: z.string()
    .min(1, 'La descripción no puede estar vacía'),
  
  estado: z.enum(['pending', 'in_progress', 'completed'], {
    errorMap: () => ({ 
      message: 'Estado inválido. Debe ser: pending, in_progress o completed' 
    })
  }).default('pending'),
  
  fecha_vencimiento: z.string()
    .refine((date) => !isNaN(new Date(date).getTime()), {
      message: 'Fecha inválida,no puede ser menor a la fecha actual'
    })
});

export type TaskSchemaType = z.infer<typeof taskSchema>;