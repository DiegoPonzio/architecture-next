import { Button } from '@/components/ui/button';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tu Trello',
  description:
    'Organiza tus proyectos y tareas en tus tableros de Trello 4 Dummies. Crea listas, administra tareas y trabaja de forma más organizada.',
  keywords: [
    'Trello 4 Dummies',
    'Trello',
    'tableros',
    'tablero kanban',
    'gestión de proyectos',
    'gestión de tareas',
    'productividad',
    'listas',
    'tareas',
  ],
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return (
    <div className="flex p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Project ready!</h1>
          <p>You may now add components and start building.</p>
          <p>Es el trello wiii</p>
          <Button className="mt-2">Button</Button>
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </div>
    </div>
  );
}
