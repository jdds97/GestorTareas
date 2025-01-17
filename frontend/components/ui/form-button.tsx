'use client';

import { useFormStatus } from 'react-dom';

// Interfaz que define las propiedades que recibe el componente
interface FormButtonProps {
    message: string;
    className: string;
    action?: () => void; // Función opcional para manejar acciones adicionales
}

// Componente de botón para formularios que maneja estados de carga
const FormButton = ({ message, className, action }: FormButtonProps) => {
    // Hook que proporciona el estado de carga del formulario
    const { pending } = useFormStatus();

    return (
        <button 
            className={className}
            type="submit"
            disabled={pending}
            onClick={action}
        >
            {pending ? 'Loading...' : message}
        </button>
    );
};

export default FormButton;
