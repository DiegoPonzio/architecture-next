import { Metadata } from 'next';
import { HomeTeam } from '@/components/teams/home-team';

export const metadata: Metadata = {
  description:
    'Gestiona tus proyectos, tareas y equipos desde el dashboard de Trello 4 Dummies. Organiza tu trabajo y mantén todo bajo control.',
  keywords: [
    'Trello 4 Dummies',
    'dashboard',
    'gestión de proyectos',
    'gestión de tareas',
    'productividad',
    'equipos',
    'proyectos',
  ],
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="w-full">
        <HomeTeam />
      </div>
    </div>
  );
}
