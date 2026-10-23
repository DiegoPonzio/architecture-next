'use client';

import { useTeam } from '@/hooks/use-teams';
import { useEffect } from 'react';
import TeamHeader from '@/components/teams/team-header';
import TeamInfo from '@/components/teams/team-info';
import StatisticTeamInfo from '@/components/teams/statistic-team-info';
import MembersTeamInfo from '@/components/teams/members-team-info';

export function HomeTeam() {
  const { currentTeam, isLoading } = useTeam();

  useEffect(() => {
    if (!currentTeam && isLoading) {
      document.title = 'Trello 4 Dummies';
      return;
    }

    document.title = `${currentTeam?.teamName}`;
  }, [currentTeam]);

  return (
    <>
      <TeamHeader
        teamName={currentTeam?.teamName || ''}
        tierName={currentTeam?.tierName || ''}
        emoji={currentTeam?.emoji || ''}
      />
      <div className="flex w-full flex-wrap">
        {/* Información del equipo */}
        <div className="flex w-full min-w-0 flex-col lg:w-2/3">
          <TeamInfo />
        </div>

        {/* Estadísticas */}
        <div className="flex w-full min-w-0 flex-col lg:w-1/3">
          <StatisticTeamInfo />
        </div>

        {/* Miembros */}
        <div className="flex w-full min-w-0 justify-end">
          <MembersTeamInfo />
        </div>
      </div>
    </>
  );
}
