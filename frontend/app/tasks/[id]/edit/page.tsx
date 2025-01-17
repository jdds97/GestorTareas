'use client';

import { redirect } from 'next/navigation';
import { useStore } from '@/components/app/context';
import TaskCard from '@/components/tasks/task-card';
import TaskForm from '@/components/tasks/task-form';
import { taskEditAction } from '@/lib/actions';

// Componente para la página de edición de tareas
export default function TaskEditPage(): JSX.Element {
    // Obtener la tarea seleccionada del store global
    const { selectedTask } = useStore();

    // Redireccionar si no hay tarea seleccionada
    // Es una medida de seguridad para evitar renderizar la página sin datos
    if (!selectedTask) {
        redirect('/tasks');
    }

    return (
        <div className="container mx-auto px-4">
            <TaskCard tarea={selectedTask} />
            <div className="mt-6 max-w-md mx-auto">
                <TaskForm
                    task={selectedTask}
                    handleAction={taskEditAction}
                    message="Editar la tarea"
                />
            </div>
        </div>
    );
}
