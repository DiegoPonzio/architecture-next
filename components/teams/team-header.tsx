import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import AddFavouriteTeam from '@/components/teams/add-favourite-team';

export default function TeamHeader({
  teamName,
  tierName,
  emoji,
}: {
  teamName: string;
  tierName: string;
  emoji: string;
}) {
  return (
    <div className="flex w-full items-center border-b pb-4">
      {/* Información del equipo */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-lg text-primary-foreground shadow-sm">
          {emoji}
        </div>

        <div className="grid min-w-0 flex-1 text-left">
          <span className="truncate text-base font-semibold">{teamName}</span>

          <span className="truncate text-sm text-muted-foreground">{tierName}</span>
        </div>
      </div>

      {/* Acciones */}
      <div className="flex shrink-0 items-center gap-2">
        <Button variant="secondary" size="sm" className="gap-2 bg-secondary font-semibold">
          <UserPlus className="size-4" />
          Invite
        </Button>

        <AddFavouriteTeam />
      </div>
    </div>
  );
}
