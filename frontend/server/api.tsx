import { getRequest } from './request';
import type { Task } from '@/types/types';

// Obtiene las tareas desde la API
export const getTasks = (token?: string) => 
    getRequest<Task[]>({ endpoint: '/api/tasks/' ,token});
