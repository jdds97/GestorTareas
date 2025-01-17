'use server';

import { revalidatePath } from 'next/cache';

// Tipos base para las peticiones
interface RequestParams {
    endpoint: string;
    token?: string;
    path?: string;
}

interface RequestWithDataParams extends RequestParams {
    data: object;
}

// Función base para crear headers comunes
const createHeaders = (token?: string): HeadersInit => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json'
    };
    
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    
    return headers;
};

// Función base para hacer peticiones HTTP
const makeRequest = async (url: URL, method: string, headers: HeadersInit, body?: object) => {
    const response = await fetch(url.href, {
        method,
        headers,
        ...(body && { body: JSON.stringify(body) })
    });

    if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
    }

    return response;
};

// Obtener datos del API
export async function getRequest<T>({ endpoint, token }: RequestParams): Promise<T> {
    const url = new URL(endpoint, process.env.NEXTAUTH_API_BASE_URL);
    const headers = createHeaders(token);
    const response = await makeRequest(url, 'GET', headers);
    return response.json();
}

// Crear nuevo recurso
export async function postRequest(p0: { endpoint: string; }, p1: string, userData: { username: FormDataEntryValue | null; email: FormDataEntryValue | null; password1: FormDataEntryValue | null; password2: FormDataEntryValue | null; }, p2: { path: string; }, { endpoint, token, path, data }: RequestWithDataParams): Promise<void> {
    const url = new URL(endpoint, process.env.NEXTAUTH_API_BASE_URL);
    const headers = createHeaders(token);
    await makeRequest(url, 'POST', headers, data);
    if (path) revalidatePath(path, 'page');
}

// Actualizar recurso existente
export async function patchRequest({ endpoint, token, path, data }: RequestWithDataParams): Promise<void> {
    const url = new URL(endpoint, process.env.NEXTAUTH_API_BASE_URL);
    const headers = createHeaders(token);
    await makeRequest(url, 'PATCH', headers, data);
    if (path) revalidatePath(path, 'page');
}

// Eliminar recurso
export async function deleteRequest({ endpoint, token, path, data }: RequestWithDataParams): Promise<void> {
    const url = new URL(endpoint, process.env.NEXTAUTH_API_BASE_URL);
    const headers = createHeaders(token);
    await makeRequest(url, 'DELETE', headers, data);
    if (path) revalidatePath(path, 'page');
}
