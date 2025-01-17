import { signInAction } from '@/lib/actions';
import { Button } from '@/components/ui/button';

type SignInProps = {
    provider?: string;
};

export function SignIn({ provider }: SignInProps) {
    return (
        <form
            action={signInAction}
            className="p-4"
            // Solo incluimos el atributo provider si tiene un valor
            {...(provider && { provider })}
        >
            <Button variant="secondary">Iniciar sesión</Button>
        </form>
    );
}
