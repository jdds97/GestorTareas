'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/select';
import FormButton from '@/components/ui/form-button';
import { useStore } from '@/components/app/context';
import { Task } from '@/lib/types';


interface TaskFormProps {
    task?: Task;
    handleAction?: (formData: FormData, task?: Task) => void;
    message: string;
}

// Constantes fuera del componente para evitar recreaciones innecesarias
const STATUS_CHOICES = [
    { value: 'pending', label: 'Pendiente' },
    { value: 'in_progress', label: 'En Progreso' },
    { value: 'completed', label: 'Completada' }
] as const;

export default function TaskForm({ handleAction, task, message }: TaskFormProps) {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const { tasks, setTasks } = useStore();

    const handleSubmit = async () => {
        if (!formRef.current) return;
        
        const formData = new FormData(formRef.current);
        
        // Si existe una tarea, actualizamos
        if (task) {
            handleAction?.(formData, task);
            return;
        }

        // Creación de nueva tarea
        const newTask: Task = {
            titulo: formData.get('titulo') as string,
            descripcion: formData.get('descripcion') as string,
            estado: formData.get('estado') as string,
            fecha_vencimiento: formData.get('fecha_vencimiento') as string,
        };

        handleAction?.(formData, newTask);
        setTasks([...tasks ?? [], newTask]);
        formRef.current.reset();
    };

    return (
        <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4 w-full">
            <Input
                type="text"
                label="Título"
                name="titulo"
                placeholder="Ingrese el título de la tarea"
                labelPlacement="outside"
                color="primary"
                defaultValue={task?.titulo}
                isRequired
            />
            <Input
                type="text"
                label="Descripción"
                name="descripcion"
                placeholder="Descripción de la tarea"
                labelPlacement="outside"
                color="primary"
                defaultValue={task?.descripcion}
            />
            <Select 
                label="Estado"
                name="estado"
                placeholder="Seleccione el estado"
                labelPlacement="outside"
                color="primary"
                defaultSelectedKeys={task ? [task.estado] : undefined}
                isRequired
            >
                {STATUS_CHOICES.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                        {status.label}
                    </SelectItem>
                ))}
            </Select>
            <Input
                type="date"
                label="Fecha de vencimiento"
                name="fecha_vencimiento"
                labelPlacement="outside"
                color="primary"
                defaultValue={task?.fecha_vencimiento}
            />
            <div className="flex gap-4">
                <FormButton 
                    message={message} 
                    className="bg-secondary text-white rounded-md flex-1"
                />
                <FormButton
                    action={() => router.push('/tasks')}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-gray-600 transition-colors flex-1"
                    message="Cancelar"
                />
            </div>
        </form>
    );
}
