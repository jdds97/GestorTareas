'use server';
import {redirect} from 'next/navigation';
import {auth, signIn, signOut} from 'auth';
import {taskSchema} from './schemas';
import {deleteRequest, patchRequest, postRequest} from './request';
import {Task,UserSession} from '@/types/types';

// Obtiene el token de acceso del usuario autenticado
export async function getToken() {
    const session: UserSession|null = await auth();
    return session?.user?.access;
}

// Acciones de autenticación
export async function signInAction() {
    await signIn();
    redirect('/');
}

export async function signOutAction() {
    await signOut();
    redirect('/auth/signin');
}

// Registra un nuevo usuario
export async function registerAction(formData: FormData) {
    const userData = {
        username: formData.get('username'),
        email: formData.get('email'),
        password1: formData.get('password'),
        password2: formData.get('password'),
    };

    await postRequest(
        {endpoint: '/api/auth/register/'}, 
        '', 
        userData, 
        {path: '/'}, 
        { endpoint: '/api/auth/register/', token: '', path: '/', data: userData }
    );
    redirect('/auth/signin');
}

// CRUD de tareas
export async function taskCreateAction(formData: FormData) {
    const session = await auth();
    const {access: token, id} = session?.user ?? {};

    const nuevaTask = taskSchema.parse({
        titulo: formData.get('titulo'),
        descripcion: formData.get('descripcion'),
        estado: formData.get('estado') ?? 'pending',
        fecha_vencimiento: formData.get('fecha_vencimiento'),
        usuario: Number(id)
    });

    await postRequest(
        {endpoint: '/api/tasks/'}, 
        token, 
        nuevaTask, 
        {path: '/tasks'}, 
        { endpoint: '/api/tasks/', token, path: '/tasks', data: nuevaTask }
    );
    redirect('/tasks');
}

export async function taskEditAction(formData: FormData, tarea: Task) {
    const session = await auth();
    const {access: token, id} = session?.user ?? {};

    const updatedTarea = taskSchema.parse({
        titulo: formData.get('titulo') ?? tarea.titulo,
        descripcion: formData.get('descripcion') ?? tarea.descripcion,
        estado: formData.get('estado') ?? tarea.estado,
        fecha_vencimiento: formData.get('fecha_vencimiento') ?? tarea.fecha_vencimiento,
        usuario: Number(id)
    });

    await patchRequest({
        endpoint: `/api/tasks/${tarea.id}/`,
        token,
        path: '/tasks',
        data: updatedTarea
    });
    redirect('/tasks');
}

export async function taskDeleteAction(tarea: Task) {
    const session = await auth();
    const token = session?.user?.access;

    await deleteRequest({
        endpoint: `/api/tasks/${tarea.id}/`,
        token,
        path: '/tasks',
        data: tarea
    });
    redirect('/tasks');
}
