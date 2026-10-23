import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex h-100 items-center justify-center px-4">
      <div className="max-w-md text-center">
        <AlertTriangle className="mx-auto mb-6 h-16 w-16" />

        <h1 className="text-7xl font-bold">404</h1>

        <h2 className="mt-4 text-2xl font-semibold">Página no encontrada</h2>

        <p className="mt-3 text-muted-foreground">
          Lo sentimos, la página que buscas no existe o no tienes acceso a ella.
        </p>

        <div className="mt-8">
          <Button asChild>
            <Link href="/">Ir al inicio</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
