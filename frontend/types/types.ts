import type {Account, Session, User, Profile} from 'next-auth';
import {AdapterUser} from 'next-auth/adapters';
import type {JWT} from 'next-auth/jwt';

export interface Task {
    id: number;
    titulo: string;
    descripcion: string;
    estado: 'pending' | 'in_progress' | 'completed';
    fecha_vencimiento: Date | null;
    creado_en: Date;
    actualizado_en: Date;
    usuario: UserSession;
}
export interface CredentialsInput {
    username: string;
    password: string;
}

export interface LoginResponseData {
    access: string;
    refresh: string;
    user: {
        id: string;
        username: string;
        email: string;
        first_name: string;
        last_name: string;
    };
}

export interface RefreshResponseData {
    access: string;
    refresh: string;
    access_expiration: Date;
    refresh_expiration: Date;
}

export interface CustomUser extends User {
    username?: string;
    first_name?: string;
    last_name?: string;
    access?: string;
    refresh?: string;
    imagen?: string;
}

export interface CustomJWT extends JWT {
    access?: string;
    refresh?: string;
    user?: CustomUser;
}

export interface JwtArguments {
    token: CustomJWT;
    user: CustomUser;
    isNewUser?: boolean | undefined;
    account: Account | null;
    profile?: Profile | undefined;
    session?: UserSession;
    trigger?: 'update' | 'signIn' | 'signUp' | undefined;
}

export interface SessionArguments {
    session: {
        user: CustomUser | AdapterUser;
        accessToken?: string;
        refreshToken?: string;
    } & Session;
    token: CustomJWT;
}

export interface UserSession extends Session {
    user?: CustomUser;
}

export type AuthCredentials = Partial<Record<keyof CredentialsInput, unknown>>;
