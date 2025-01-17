import { FC } from 'react';

import FormButton from '@/components/ui/form-button';
import { registerAction } from '@/lib/actions';

const RegisterPage: FC = () => {
    const inputClasses = "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary";
    const labelClasses = "block text-sm font-medium text-gray-700";

    const formFields = [
        {
            id: 'username',
            label: 'Nombre completo',
            type: 'text',
        },
        {
            id: 'email',
            label: 'Correo electrónico',
            type: 'email',
        },
        {
            id: 'password',
            label: 'Contraseña',
            type: 'password',
        },
    ];
    return (
        <main className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <header className="text-left">
                    <h2 className="text-primary font-semibold">Únete a Task Master</h2>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                        Registro
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Crea tu cuenta para comenzar a gestionar tus tareas de forma eficiente.
                    </p>
                </header>

                <form action={registerAction} className="mt-8 space-y-6">
                    {formFields.map(({ id, label, type }) => (
                        <div key={id}>
                            <label htmlFor={id} className={labelClasses}>
                                {label}
                            </label>
                            <input
                                type={type}
                                name={id}
                                id={id}
                                required
                                className={inputClasses}
                                aria-label={label}
                            />
                        </div>
                    ))}
                    <FormButton
                        message="Registrarse"
                        className="w-full rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    />
                </form>
            </div>
        </main>
    );
};

export default RegisterPage;
