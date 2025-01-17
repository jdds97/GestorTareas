'use client';

import { redirect } from 'next/navigation';
import { useStore } from '@/components/app/context';
import { DeleteTask, EditTask } from '@/components/tasks/tasks-buttons';
import TaskCard from '@/components/tasks/task-card';

export default function TaskDetailPage() {
    // Obtenemos la tarea seleccionada del store global
    const { selectedTask } = useStore();

    // Redirección temprana si no hay tarea seleccionada
    if (!selectedTask) {
        redirect('/tasks');
    }

    return (
        <main className="flex flex-col items-center justify-center my-5">
            <TaskCard tarea={selectedTask} />
            <div className="flex gap-3 mt-2">
                <EditTask 
                    tarea={selectedTask} 
                    message="Editar tarea" 
                />
                <DeleteTask 
                    tarea={selectedTask} 
                    message="Eliminar tarea" 
                />
            </div>
        </main>
    );
}
