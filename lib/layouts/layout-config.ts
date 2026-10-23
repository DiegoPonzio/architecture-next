/**
 * Configuraciones predefinidas de layouts
 * Siguiendo DRY (Don't Repeat Yourself)
 */
import type { LayoutConfig } from './layout.interface';
import { ThemeProvider } from '@/components/nav/theme-provider';
import { TeamProvider } from '@/components/teams/team-context';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SidebarProvider } from '@/components/ui/sidebar';

/**
 * Configuración para layout de autenticación (login, signup, etc)
 * Responsabilidad única: Proporcionar tema y autenticación
 * SRP: Un solo propósito - interfaz de auth limpia
 */
export const authLayoutConfig: LayoutConfig = {
  name: 'Auth Layout',
  providers: [
    {
      name: 'ThemeProvider',
      component: ThemeProvider,
    },
  ],
};

/**
 * Configuración para layout de dashboard
 * Responsabilidad única: Proporcionar acceso a equipos y UI completa
 * SRP: Un solo propósito - interfaz de dashboard completa
 */
export const dashboardLayoutConfig: LayoutConfig = {
  name: 'Dashboard Layout',
  metadata: {
    description: 'Layout completo para dashboard con navegación',
    title: 'Dashboard',
  },
  providers: [
    {
      name: 'Team Provider',
      component: TeamProvider,
    },
    {
      name: 'Theme Provider',
      component: ThemeProvider,
    },
    {
      name: 'Tooltip Provider',
      component: TooltipProvider,
    },
    {
      name: 'Sidebar Provider',
      component: SidebarProvider,
    },
  ],
};

/**
 * Configuración para layout mínimo
 * Responsabilidad única: Solo tema
 * Útil para páginas públicas simples
 */
export const minimalLayoutConfig: LayoutConfig = {
  name: 'MinimalLayout',
  metadata: {
    description: 'Layout mínimo solo con tema',
    title: 'Minimal',
  },
  providers: [
    {
      name: 'ThemeProvider',
      component: ThemeProvider,
    },
  ],
};

/**
 * Configuración para layout administrativo
 * Responsabilidad única: Acceso a equipos, tema y tools avanzadas
 */
export const adminLayoutConfig: LayoutConfig = {
  name: 'AdminLayout',
  metadata: {
    description: 'Layout para admin con herramientas avanzadas',
    title: 'Admin',
  },
  providers: [
    {
      name: 'ThemeProvider',
      component: ThemeProvider,
    },
    {
      name: 'TeamProvider',
      component: TeamProvider,
    },
    {
      name: 'TooltipProvider',
      component: TooltipProvider,
    },
  ],
};
