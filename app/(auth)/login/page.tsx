import { LoginForm } from '@/components/auth/login-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Iniciar sesión',
  description:
    'Inicia sesión en Trello 4 Dummies y administra tus proyectos, tareas y equipos de forma sencilla y organizada.',
  keywords: [
    'Trello 4 Dummies',
    'gestión de proyectos',
    'gestión de tareas',
    'tableros',
    'productividad',
    'trello4dummies',
    'trello 4 dummies',
  ],
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <LoginForm />;
}
