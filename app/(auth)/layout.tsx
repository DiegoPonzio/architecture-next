import { LayoutComposer } from '@/lib/layouts';
import { authLayoutConfig } from '@/lib/layouts';

// Crear el layout usando el compositor
const AuthLayoutComponent = LayoutComposer.compose(authLayoutConfig);

/**
 * Auth Layout
 * Usa patrón de composición SOLID
 *
 * Responsabilidad única: Orquestar providers de autenticación
 * Abierto/Cerrado: Puede extenderse con nuevos providers sin modificar
 * Liskov: Intercambiable con otros layouts
 * Interface Segregation: Usa solo interfaces necesarias
 * Dependency Inversion: Depende de LayoutConfig, no de implementaciones
 */
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthLayoutComponent>{children}</AuthLayoutComponent>;
}
