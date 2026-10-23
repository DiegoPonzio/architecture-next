'use client';

import { SidebarMenuSkeleton } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';

export function TeamSwitcherSkeleton() {
  return (
    <SidebarMenuSkeleton className="size-5" aria-disabled>
      <Skeleton className="size-8 rounded-lg" />

      <div className="grid flex-1 gap-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>

      <Skeleton className="h-4 w-4" />
    </SidebarMenuSkeleton>
  );
}
