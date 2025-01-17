'use client';

import {NextUIProvider} from '@nextui-org/react';

/**
 * Componente de proveedor que envuelve la aplicación con NextUIProvider.
 * 
 * Este componente es responsable de proporcionar el contexto de NextUI
 * a todos los componentes hijos de la aplicación.
 * 
 * @param {Object} props - Las propiedades del componente
 * @param {React.ReactNode} props.children - Los componentes hijos que serán envueltos por el proveedor
 * @returns {JSX.Element} Un componente NextUIProvider que envuelve los children proporcionados
 */
export function Providers({children}: {children: React.ReactNode}) {
    return (
        <NextUIProvider>
            {children}
        </NextUIProvider>
    );
}
