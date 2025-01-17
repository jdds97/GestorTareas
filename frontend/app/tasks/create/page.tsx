import {taskCreateAction} from '@/lib/actions';
import TaskForm from '@/components/tasks/task-form';

export default function TaskCreatePage() {
    return (
        <div className="p-3">
            <TaskForm handleAction={taskCreateAction} message="Crear tarea" />
        </div>
    );
}
