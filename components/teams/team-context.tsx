'use client';

import { type ReactNode, useEffect, useMemo, useState } from 'react';

import { useApi } from '@/hooks/use-api';
import type { UserTeamResponse } from '@/interface/user-team-response';
import { TeamContext } from '@/context/team.context';
import { useRouter } from 'next/navigation';

const STORAGE_KEY = 'selected-team-id';

const defaultTeam: UserTeamResponse = {
  teamId: 0,
  teamName: 'Tu espacio',
  shortDescription: 'Tu espacio de productividad',
  description: 'Espacio de productividad personal para organizar tus proyectos y tareas.',
  emoji: '🖥️',
  tierId: 0,
  tierName: 'Personal',
  maxUsers: 1,
  maxProjects: 0,
  teamRoleId: 0,
  teamRoleName: 'Personal',
};

export function TeamProvider({ children }: { children: ReactNode }) {
  const { data = [], isLoading } = useApi<UserTeamResponse[]>('/user-teams', {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
  });

  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);

  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  /**
   * Solo ejecutar código del navegador
   */
  useEffect(() => {
    setMounted(true);

    const value = window.localStorage.getItem(STORAGE_KEY);

    if (!value) {
      return;
    }

    const teamId = Number(value);

    if (!Number.isNaN(teamId)) {
      setSelectedTeamId(teamId);
    }
  }, []);

  const teams = useMemo(() => [defaultTeam, ...data], [data]);

  const currentTeam = useMemo(() => {
    if (!teams.length) {
      return undefined;
    }

    return teams.find((team) => team.teamId === selectedTeamId) ?? teams[0];
  }, [teams, selectedTeamId]);

  const selectTeam = (team: UserTeamResponse) => {
    setSelectedTeamId(team.teamId);

    window.localStorage.setItem(STORAGE_KEY, String(team.teamId));
    // si es el equipo 0 'tu espacio', se redirecciona a su trello '/my-trello'
    if (team.teamId === 0) {
      router.replace('/my-trello');
    }
  };

  /**
   * Si necesitas que lo que depende de localStorage
   * sea idéntico entre SSR y cliente, puedes evitar
   * renderizarlo hasta montar.
   */
  if (!mounted) {
    return (
      <TeamContext.Provider
        value={{
          teams,
          currentTeam: teams[0],
          isLoading,
          selectTeam,
        }}
      >
        {children}
      </TeamContext.Provider>
    );
  }

  return (
    <TeamContext.Provider
      value={{
        teams,
        currentTeam,
        isLoading,
        selectTeam,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}
