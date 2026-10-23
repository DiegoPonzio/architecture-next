'use client';

import { Avatar, AvatarGroup } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

export function MembersSkeleton() {
  return (
    <AvatarGroup className="grayscale">
      <Avatar>
        <Skeleton className="size-full rounded-full" />
      </Avatar>

      <Avatar>
        <Skeleton className="size-full rounded-full" />
      </Avatar>

      <Avatar>
        <Skeleton className="size-full rounded-full" />
      </Avatar>

      <div className="flex size-8 items-center justify-center rounded-full border">
        <Skeleton className="h-3 w-5" />
      </div>
    </AvatarGroup>
  );
}
