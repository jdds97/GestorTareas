import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {Task} from '@/types/types';

// Define el estado global de la aplicación
type GlobalState = {
    tasks?: Task[];
    selectedTask?: Task;
    setTasks: (tasks?: Task[]) => void;
    setSelectedTask: (task?: Task) => void;
}

// Crea el store(gestor de estado) con persistencia usando zustand
export const useStore = create<GlobalState>()(
    persist(
        (set) => ({
            tasks: undefined,
            selectedTask: undefined,
            setTasks: (tasks) => set({tasks}),
            setSelectedTask: (selectedTask) => set({selectedTask}),
        }),
        {
            name: 'task-store', // Nombre para identificar en localStorage
        }
    )
);
