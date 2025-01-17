import {auth} from 'auth';
import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import {UserSession} from '@/types/types';

export async function middleware(req: NextRequest) {
    const session :UserSession | null = await auth();

    const {pathname, origin} = req.nextUrl;

    // URLs públicas que no requieren autenticación
    const publicPaths = ['/auth/signin', '/'];

    // URLs privadas que requieren autenticación
    const privatePaths = ['/api', '/api/:path*'];

    const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
    const isPrivatePath = privatePaths.some(path => pathname.startsWith(path));

    if (isPrivatePath && !session) {
    // Si es una ruta privada y el usuario no está autenticado, redirigir al inicio de sesión
        const redirectUrl = `${origin}/auth/signin`;

        return NextResponse.redirect(redirectUrl);
    }

    if (isPublicPath) {
    // Si es una ruta pública, permitir el acceso
        return NextResponse.next();
    }

    // Si no es una ruta pública ni privada, continuar con la siguiente middleware
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)/'],
};
