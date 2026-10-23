import type { UserTeamResponse } from '@/interface/user-team-response.ts';

export type TeamContextType = {
  teams: UserTeamResponse[];
  currentTeam?: UserTeamResponse;
  isLoading: boolean;
  selectTeam: (team: UserTeamResponse) => void;
};
