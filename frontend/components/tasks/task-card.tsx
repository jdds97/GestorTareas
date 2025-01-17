import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Task } from '@/types/types';

interface TaskCardProps {
    tarea: Task | undefined;
}

// Componente que muestra los detalles de una tarea en formato de tarjeta
export default function TaskCard({ tarea }: TaskCardProps) {
    if (!tarea) return null; // Evita renderizar si no hay tarea

    return (
        <Card>
            <CardHeader>
                <h2 className="text-4xl font-bold">{tarea.titulo}</h2>
            </CardHeader>
            <CardHeader>
                <h3 className="text-lg font-bold mt-5">Descripción</h3>
            </CardHeader>
            <CardBody>
                <p className="text-sm text-gray-600">{tarea.descripcion}</p>
            </CardBody>
            <CardBody>
                <p className="text-sm text-gray-600">Estado: {tarea.estado}</p>
                {tarea.fecha_vencimiento && (
                    <p className="text-sm text-gray-600">
                        Fecha de vencimiento: {tarea.fecha_vencimiento}
                    </p>
                )}
            </CardBody>
            <CardFooter>
                <div className="text-sm text-gray-600">
                    <p>Creado: {tarea.creado_en}</p>
                    <p>Última actualización: {tarea.actualizado_en}</p>
                </div>
            </CardFooter>
        </Card>
    );
}
