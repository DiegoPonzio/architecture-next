import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTeam } from '@/hooks/use-teams';
import TeamInfoSkeleton from '@/components/teams/team-info-skeleton';

export default function TeamInfo() {
  const { currentTeam, isLoading } = useTeam();

  if (isLoading) {
    return <TeamInfoSkeleton />;
  }

  return (
    <Card className="my-6 md:mr-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex flex-col">
            <span>Acerca del proyecto</span>
            <span className="text-xs text-muted-foreground">{currentTeam?.tierName}</span>
          </CardTitle>

          <Button
            variant="ghost"
            size="icon"
            className="size-8 transition-colors duration-200 hover:bg-primary/10 hover:text-primary"
            aria-label="Editar proyecto"
          >
            <Pencil className="size-4 transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:rotate-[-12deg]" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <p>{currentTeam?.description || 'Descripcion no disponible'}</p>
      </CardContent>
    </Card>
  );
}
