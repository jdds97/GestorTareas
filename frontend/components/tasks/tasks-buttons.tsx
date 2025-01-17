import { Eye, SquarePen, Trash2 } from 'lucide-react';
import CustomLink from '@/components/ui/custom-link';
import { Task } from '@/types/types';

// Tipos comunes para los props de los componentes de tareas
interface TaskButtonProps {
    task?: Task;
    handleSelected?: (task?: Task) => void;
    message?: string;
}

// Componente para crear una nueva tarea
export function CreateTask() {
    return (
        <div className="flex gap-3">
            <CustomLink
                href="/tasks/create"
                className="bg-primary rounded items-center text-white"
            >
                Crear tarea
            </CustomLink>
        </div>
    );
}

// Componente para ver los detalles de una tarea
export function ViewTask({ task, handleSelected, message }: TaskButtonProps) {
    return (
        <CustomLink
            href={`/tasks/${task?.id}`}
            onClick={() => handleSelected?.(task)}
        >
            <div className="flex gap-3">
                {message}
                <Eye size={24} />
            </div>
        </CustomLink>
    );
}

// Componente para editar una tarea existente
export function EditTask({ task, handleSelected, message }: TaskButtonProps) {
    return (
        <CustomLink
            href={`/tasks/${task?.id}/edit`}
            onClick={() => handleSelected?.(task)}
        >
            <div className="flex gap-3">
                {message}
                <SquarePen size={24} color="blue" />
            </div>
        </CustomLink>
    );
}

// Componente para eliminar una tarea
export function DeleteTask({ task, handleSelected, message }: TaskButtonProps) {
    return (
        <CustomLink
            href={`/tasks/${task?.id}/delete`}
            onClick={() => handleSelected?.(task)}
        >
            <div className="flex gap-3">
                {message}
                <Trash2 size={24} color="red" />
            </div>
        </CustomLink>
    );
}
