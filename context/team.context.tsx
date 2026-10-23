'use client';

import { createContext } from 'react';
import type { TeamContextType } from '@/types/team-context.type.ts';

export const TeamContext = createContext<TeamContextType | null>(null);
