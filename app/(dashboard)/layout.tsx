import { LayoutComposer } from '@/lib/layouts';
import { dashboardLayoutConfig } from '@/lib/layouts';
import { TeamProvider } from '@/components/teams/team-context';
import { ThemeProvider } from '@/components/nav/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AppSidebar } from '@/components/nav/app-sidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Members } from '@/components/nav/members';
import { UserNav } from '@/components/nav/user-nav';
import { ThemeToggle } from '@/components/nav/theme-toggle';

// Crear el layout usando el compositor
const DashboardLayoutComponent = LayoutComposer.compose(dashboardLayoutConfig);

/**
 * Dashboard Layout
 * Usa patrón de composición SOLID
 *
 * Responsabilidad única: Orquestar providers del dashboard
 * Abierto/Cerrado: Puede extenderse con nuevos providers sin modificar
 * Liskov: Intercambiable con otros layouts
 * Interface Segregation: Usa solo interfaces necesarias
 * Dependency Inversion: Depende de LayoutConfig, no de implementaciones
 */
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardLayoutComponent>
      <AppSidebar />
      <main className="flex min-h-screen flex-1 flex-col">
        <div className="flex w-full justify-between border-b p-2">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <Members />
            <UserNav />
            <ThemeToggle />
          </div>
        </div>

        <div className="flex-1">{children}</div>
      </main>
    </DashboardLayoutComponent>
  );
}
