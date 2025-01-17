'use client';

import { redirect, useRouter } from 'next/navigation';
import { useStore } from '@/components/app/context';
import TaskCard from '@/components/tasks/task-card';
import FormButton from '@/components/ui/form-button';
import { taskDeleteAction } from '@/lib/actions';

// Usando arrow function y type inference de TypeScript
const TaskDeletePage = () => {
    const router = useRouter();
    const { selectedTask } = useStore();

    // Redirección temprana si no hay tarea seleccionada
    if (!selectedTask) {
        redirect('/tasks');
        return null;
    }

    // Handlers memorizados como constantes
    const handleDelete = () => taskDeleteAction(selectedTask);
    const handleCancel = () => router.push('/tasks');

    return (
        <div className="flex flex-col items-center justify-center gap-6 my-8 max-w-md mx-auto p-6 bg-white rounded-lg">
            <TaskCard tarea={selectedTask} />
            
            <p className="text-lg font-medium text-red-700 mb-4">
                ¿Seguro que quieres eliminar la tarea?
            </p>
            
            <div className="flex gap-4">
                <FormButton 
                    action={handleDelete}
                    message="Eliminar tarea" 
                    className="bg-red-600 hover:bg-red-700 transition-colors rounded-md px-6 py-3 text-white font-medium shadow-sm"
                />
                <FormButton 
                    action={handleCancel}
                    message="Cancelar" 
                    className="bg-blue-600 hover:bg-blue-700 transition-colors rounded-md px-6 py-3 text-white font-medium shadow-sm"
                />
            </div>
        </div>
    );
};

export default TaskDeletePage;
