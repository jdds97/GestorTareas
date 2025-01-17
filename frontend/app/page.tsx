import Image from 'next/image';
import {ListTodo} from 'lucide-react';

// Definición del tipo para los elementos de características
type Feature = {
    name: string;
    description: string;
    icon: React.ComponentType<{ className?: string }> // Tipo específico para el icono
};

// Elemento único de característica ya que solo tenemos uno
const feature: Feature = {
    name: 'Tareas',
    description: 'En esta sección puedes gestionar tus tareas diarias de manera rápida y sencilla.',
    icon: ListTodo,
};

export default function RootPage() {
    return (
        <main className="overflow-hidden py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid grid-cols-2 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0">
                    {/* Sección de texto e información */}
                    <div className="lg:pr-8 lg:pt-4">
                        <div className="lg:max-w-lg">
                            <h2 className="text-primary font-semibold leading-7">
                                Gestiona todas tus tareas
                            </h2>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                                Task Master
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                En Task Master puedes gestionar todas tus tareas diarias de forma eficiente.
                            </p>
                            {/* Sección de características */}
                            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600">
                                <div className="relative pl-9">
                                    <dt className="inline font-semibold text-primary">
                                        <feature.icon 
                                            className="absolute left-1 top-1 h-5 w-5 text-primary" 
                                            aria-hidden="true" 
                                        />
                                        {feature.name}
                                    </dt>
                                    <dd className="inline">{feature.description}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    {/* Sección de imagen */}
                    <div className="lg:pl-8 lg:pt-4">
                        <Image
                            src="/tasks-management.jpeg"
                            alt="Imagen de gestión de tareas"
                            className="w-full rounded-xl shadow-xl ring-1 ring-gray-400/10"
                            width={1080}
                            height={720}
                            priority
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
