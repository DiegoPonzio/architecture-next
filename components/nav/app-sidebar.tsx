'use client';

import { ThemeToggle } from '@/components/nav/theme-toggle';
import { TeamSwitcher } from '@/components/nav/team-switcher';
import { Cog, LayoutDashboard, SquareKanban } from 'lucide-react';
import { ItemsNav } from '@/components/nav/items-nav';
import { Home } from 'lucide-react';
import type { NavItem } from '@/interface/nav-item';
import { useTeam } from '@/hooks/use-teams';
import { ItemsNavSkeleton } from '@/components/nav/items-nav-skeleton';
import { useMemo } from 'react';
import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export function AppSidebar() {
  const { currentTeam, isLoading } = useTeam();

  const menuItemsDefault: NavItem[] = [
    {
      title: 'Dashboard',
      url: '#',
      icon: LayoutDashboard,
      children: [
        {
          title: 'Dashboard',
          url: '/alumnos',
        },
        {
          title: 'Wiki',
          url: '/materias',
        },
      ],
    },
    {
      title: 'Tu Trello',
      url: '/my-trello',
      icon: SquareKanban,
    },
  ];

  const menuItems = useMemo(() => {
    if (currentTeam?.tierId !== 0) {
      return [
        {
          title: `Equipo (${currentTeam?.teamName})`,
          url: '/',
          icon: Home,
        },
        ...menuItemsDefault,
      ];
    } else {
      return menuItemsDefault;
    }
  }, [currentTeam?.teamId]);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>

          {isLoading ? <ItemsNavSkeleton /> : <ItemsNav items={menuItems || []} />}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <SidebarMenuButton asChild>
                  <Link href="/configuracion">
                    <Cog />
                    <span>Configuración</span>
                  </Link>
                </SidebarMenuButton>
              </div>

              <div className="group-data-[collapsible=icon]:hidden">
                <ThemeToggle />
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
