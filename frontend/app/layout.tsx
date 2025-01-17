import '@/styles/globals.css';
import { Providers } from './provider';
import Header from '@/components/app/header';

// Componente principal del layout que envuelve toda la aplicación
// Proporciona la estructura HTML básica y componentes comunes
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body>
                <Providers>
                    <Header />
                    <main>
                        {children}
                    </main>
                </Providers>
            </body>
        </html>
    );
}
