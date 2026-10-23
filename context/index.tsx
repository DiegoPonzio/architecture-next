'use client';

import { AuthProvider } from './auth.context';
import { TeamContext } from './team.context';

export function CoreProviders({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export { useAuthContext } from './auth.context';
export { TeamContext } from './team.context';
