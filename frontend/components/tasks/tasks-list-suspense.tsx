import { auth } from 'auth';
import { redirect } from 'next/navigation';
import { getTasks } from '@/lib/api';
import { UserSession, Task } from '@/types/types';
import TaskList from './tasks-list';

export default async function TaskListSuspense({ query }: { query?: string }) {
    // Obtener la sesión del usuario y validar autenticación
    const session: UserSession | null = await auth();
    const token = session?.user?.access;
    
    if (!token) {
        redirect('/auth/signin');
    }

    // Obtener tareas desde la API
    const tasks = await getTasks(token);
    
    if (!tasks) {
        redirect('/');
    }

    // Filtrar tareas según el término de búsqueda (si existe)
    const filteredTasks = query 
        ? tasks.filter((task: Task) => 
            task.titulo.toLowerCase().includes(query.toLowerCase()))
        : tasks;
    
    return <TaskList tasks={filteredTasks} />;
}
