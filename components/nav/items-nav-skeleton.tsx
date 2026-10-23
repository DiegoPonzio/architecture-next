'use client';

import { Skeleton } from '@/components/ui/skeleton';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

export function ItemsNavSkeleton() {
  return (
    <SidebarMenu>
      {Array.from({ length: 4 }).map((_, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuButton disabled>
            <Skeleton className="size-4 shrink-0" />

            <Skeleton className="h-4 w-24" />

            {index === 1 && <Skeleton className="ml-auto size-4" />}
          </SidebarMenuButton>

          {index === 1 && (
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton aria-disabled>
                  <Skeleton className="h-4 w-20" />
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>

              <SidebarMenuSubItem>
                <SidebarMenuSubButton aria-disabled>
                  <Skeleton className="h-4 w-16" />
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>

              <SidebarMenuSubItem>
                <SidebarMenuSubButton aria-disabled>
                  <Skeleton className="h-4 w-24" />
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          )}
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
