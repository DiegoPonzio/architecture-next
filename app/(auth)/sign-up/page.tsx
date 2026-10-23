import { SignUpForm } from '@/components/auth/sign-up-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crear cuenta',
  description:
    'Crea tu cuenta en Trello 4 Dummies y comienza a organizar tus proyectos, tareas y equipos de forma sencilla.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignUp() {
  return <SignUpForm />;
}
