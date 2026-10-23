import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Members } from '@/components/nav/members';

export default function MembersTeamInfo() {
  return (
    <div className="w-full min-w-0 lg:w-1/3">
      <Card className="w-full min-w-0">
        <CardHeader>
          <CardTitle className="flex flex-col">
            <span>Miembros del equipo</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="min-w-0">
          <div className="w-full min-w-0 overflow-hidden">
            <Members />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
