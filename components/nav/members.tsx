'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useTeam } from '@/hooks/use-teams';
import { useApi } from '@/hooks/use-api';
import type { UserDto } from '@/interface/user-dto';
import { useAuth } from '@/hooks/use-auth';
import { MembersSkeleton } from '@/components/nav/members-skeleton';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from '@/components/ui/avatar';

export function Members() {
  const { currentTeam } = useTeam();
  const { data, isLoading: isLoadingUser } = useAuth();

  const { data: members = [], isLoading } = useApi<UserDto[]>(
    `/user-teams/${currentTeam?.teamId}/members`,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    },
  );

  if (isLoading || isLoadingUser) {
    return <MembersSkeleton />;
  }

  const sortedUsers = [...members].sort((a, b) => {
    if (a.username === data?.username) return -1;
    if (b.username === data?.username) return 1;
    return 0;
  });

  const visibleUsers = sortedUsers.slice(0, 3);
  const hiddenUsers = sortedUsers.slice(3);

  const getInitials = (username: string) =>
    username
      .split(/[\s_-]+/)
      .map((part) => part[0]?.toUpperCase())
      .join('')
      .slice(0, 2);

  return (
    <AvatarGroup>
      {visibleUsers.map((user) => (
        <Tooltip key={user.username}>
          <TooltipTrigger asChild>
            <Avatar key={user.username}>
              <AvatarImage src={''} alt={user.username} />
              <AvatarFallback>{getInitials(user.username)}</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{user.username}</p>
          </TooltipContent>
        </Tooltip>
      ))}

      {hiddenUsers.length > 0 && (
        <Popover>
          <PopoverTrigger asChild>
            <button type="button">
              <AvatarGroupCount>+{hiddenUsers.length}</AvatarGroupCount>
            </button>
          </PopoverTrigger>

          <PopoverContent align="start" className="w-72 p-2">
            <div className="space-y-2">
              {hiddenUsers.map((user) => (
                <div
                  key={user.username}
                  className="flex items-center gap-3 rounded-md p-2 hover:bg-muted"
                >
                  <Avatar className="size-8">
                    <AvatarImage src={''} alt={user.username} />
                    <AvatarFallback>{getInitials(user.username)}</AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{user.username}</p>

                    <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </AvatarGroup>
  );
}
