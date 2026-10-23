'use client';

import { ChevronsUpDown, Plus } from 'lucide-react';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTeam } from '@/hooks/use-teams';
import { TeamSwitcherSkeleton } from '@/components/nav/team-switcher-skeleton';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';
import { NewTeam } from '@/components/teams/new-team';

export function TeamSwitcher() {
  const isMobile = useIsMobile();
  const { teams, currentTeam, isLoading, selectTeam } = useTeam();

  if (isLoading) {
    return <TeamSwitcherSkeleton />;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                {currentTeam?.emoji}
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{currentTeam?.teamName}</span>
                <span className="truncate text-xs">{currentTeam?.tierName}</span>
              </div>

              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="start"
            sideOffset={4}
          >
            <div className="px-2 py-1.5 text-xs text-muted-foreground">Teams</div>

            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.teamName}
                className="gap-2 p-2"
                onClick={() => selectTeam(team)}
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  {team.emoji}
                </div>

                <span className="flex-1">{team.teamName}</span>

                <span className="text-xs text-muted-foreground">⌘{index + 1}</span>
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />

            <Drawer direction="right">
              <DrawerTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="gap-2 p-2">
                  <div className="flex size-6 items-center justify-center rounded-md border">
                    <Plus className="size-4" />
                  </div>

                  <span className="font-medium">Add team</span>
                </DropdownMenuItem>
              </DrawerTrigger>

              <NewTeam />
            </Drawer>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
