'use client';

import React from 'react';
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
} from '@nextui-org/card';
import {useStore} from '@/components/app/context';
import {ViewTask, EditTask, DeleteTask} from './tasks-buttons';
import {Task} from '@/types/types';

// Tipado explícito para las props del componente
interface TaskListProps {
    tasks: Task[] | undefined;
}

export default function TaskList({tasks}: TaskListProps) {
    const {setSelectedTask} = useStore();

    // Manejador para actualizar la tarea seleccionada en el contexto global
    const handleSelected = (task?: Task) => {
        setSelectedTask(task);
    };

    // Renderizado condicional para cuando no hay tareas
    if (!tasks?.length) {
        return (
            <Card className="p-4">
                <CardBody>
                    <h2 className="text-lg font-bold text-center">No hay tareas</h2>
                </CardBody>
            </Card>
        );
    }

    // Componente para renderizar el contenido de una sección de la tarjeta
    const CardSection = ({title, content}: {title: string; content: string}) => (
        <>
            <CardHeader>
                <h3 className="text-lg font-bold">{title}</h3>
            </CardHeader>
            <CardBody>
                <p className="text-sm">{content}</p>
            </CardBody>
        </>
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-3">
            {tasks.map(task => (
                <Card key={task.titulo}>
                    <CardSection title="Nombre" content={task.titulo} />
                    <CardSection title="Descripción" content={task.descripcion} />
                    <CardSection title="Estado" content={task.estado} />
                    <CardSection title="Fecha Vencimiento" content={task.fecha_vencimiento} />
                    
                    <CardFooter>
                        <div className="flex gap-3">
                            <ViewTask task={task} handleSelected={handleSelected} />
                            <EditTask task={task} handleSelected={handleSelected} />
                            <DeleteTask task={task} handleSelected={handleSelected} />
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
