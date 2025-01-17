'use client';
import React from 'react';
import {useSession} from 'next-auth/react';
import Image from 'next/image';
import {MoonIcon} from '@/public/MoonIcon';
import {SunIcon} from '@/public/SunIcon';
import {
    Switch,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar
} from '@nextui-org/react';
import {SignIn} from '@/components/app/auth-components';
import CustomLink from '@/components/ui/custom-link';
import {Button} from '@/components/ui/button';
import {UserSession} from '@/types/types';
// Constantes movidas fuera del componente para evitar recreaciones
const NAVIGATION = [
    { name: 'Home', href: '/' },
    { name: 'Tareas', href: '/tasks' },
] as const;

const LOGO_CONFIG = {
    src: '/tasks-management.jpeg',
    alt: 'logo',
    width: 100,
    height: 50,
} as const;

export default function MainNav() {
    const {data: session} = useSession() as { data: UserSession | null };
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    // Función separada para manejar el tema oscuro
    const handleThemeToggle = (checked: boolean) => {
        if (checked) {
            document.documentElement.classList.toggle('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    // Función separada para la navegación
    const handleRegisterClick = () => window.location.href = '/register';
    console.log(session?.user);
    return (
        <Navbar
            className="bg-primary"
            isBordered
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
        >
            {/* Botón de menú móvil */}
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'} />
            </NavbarContent>

            {/* Contenido principal de la navbar */}
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarBrand>
                    <CustomLink href="/">
                        <Image {...LOGO_CONFIG} />
                    </CustomLink>
                </NavbarBrand>
                {NAVIGATION.map(({name, href}) => (
                    <NavbarItem key={name}>
                        <CustomLink className="hover:text-secondary" href={href}>
                            {name}
                        </CustomLink>
                    </NavbarItem>
                ))}
            </NavbarContent>

            {/* Menú móvil */}
            <NavbarMenu>
                {NAVIGATION.map(({name, href}) => (
                    <NavbarMenuItem key={name}>
                        <CustomLink className="hover:text-secondary" href={href}>
                            {name}
                        </CustomLink>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>

            {/* Controles de usuario */}
            <NavbarContent justify="end">
                <Switch
                    defaultSelected
                    size="md"
                    color="warning"
                    startContent={<SunIcon />}
                    endContent={<MoonIcon />}
                    onChange={handleThemeToggle}
                >
                    Dark mode
                </Switch>

                {session?.user ? (
                    // Menú de usuario autenticado
                    <Dropdown placement="bottom-start">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="h-12 w-12 justify-center items-center position-auto"
                                src={session.user.imagen}
                                alt="Usuario"
                                color="warning"
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Iniciado sesión con {session?.user?.username}</p>
                            </DropdownItem>
                            <DropdownItem key="tareas" href="/tasks" color="primary">
                                Mis tareas
                            </DropdownItem>
                            <DropdownItem key="logout" color="danger" href="/auth/signout">
                                Cerrar sesión
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                ) : (
                    // Botones de autenticación
                    <>
                        <Button onClick={handleRegisterClick} variant="destructive">
                            Registrarse
                        </Button>
                        <SignIn />
                    </>
                )}
            </NavbarContent>
        </Navbar>
    );
}
