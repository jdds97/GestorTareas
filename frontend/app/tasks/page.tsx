import {Suspense} from 'react';
import {CreateTask} from '@/components/tasks/tasks-buttons';
import SearchBar from '@/components/ui/search';
import {CardsSkeleton} from '@/components/ui/skeletons';
import TaskListSuspense from '@/components/tasks/tasks-list-suspense';

// Se define el tipo de las props para mejor tipado
type TasksPageProps = {
    searchParams?: {
        query?: string
    }
}

export default function TasksPage({searchParams = {}}: TasksPageProps) {
    // Utilizamos el operador de coalescencia nulo para una sintaxis más limpia
    const query = searchParams?.query ?? '';

    return (
        <main className="mt-4">
            <h2 className="text-xl font-bold tracking-tight text-primary sm:text-4xl p-3">
                Tareas
            </h2>
            
            <div className="mt-4 flex items-center justify-between gap-1 md:mt-8 mb-2 p-3">
                <SearchBar placeholder="Buscar tarea..." />
                <CreateTask />
            </div>

            <Suspense fallback={<CardsSkeleton />}>
                <TaskListSuspense query={query} />
            </Suspense>
        </main>
    );
}
