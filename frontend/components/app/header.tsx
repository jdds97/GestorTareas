import {auth} from 'auth';
import MainNav from '@/components/app/main-nav';
import {SessionProvider} from 'next-auth/react';
import {UserSession} from '@/types/types';

export default async function Header() {
    const session : UserSession | null = await auth();

    return (
        <SessionProvider session={session} basePath="/auth">
            <header className="flex justify-between items-center">
                <MainNav/>
            </header>
        </SessionProvider>
    );
}

