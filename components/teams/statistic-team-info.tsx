import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { ClipboardCheck, ClipboardList, GitGraph } from 'lucide-react';

export default function StatisticTeamInfo() {
  const [val, setVal] = useState('7d');

  const labels: Record<string, string> = {
    '1d': 'Hace: 1 Día',
    '7d': 'Hace: 7 Días',
    '30d': 'Hace: 30 Días',
  };

  return (
    <Card className="my-6 ml-0 w-full">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="flex flex-col">
            <span>Estadísticas del proyecto</span>
          </CardTitle>

          <Select onValueChange={setVal} defaultValue="7d">
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="Período">{val ? labels[val] : 'Período'}</SelectValue>
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Período</SelectLabel>
                <SelectItem value="1d">1 Día</SelectItem>
                <SelectItem value="7d">7 Días</SelectItem>
                <SelectItem value="30d">30 Días</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex w-full flex-col gap-4">
          {/* Tareas */}
          <div className="w-full border-b pb-4">
            <span className="text-sm font-medium text-muted-foreground">Tareas</span>

            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Pendientes */}
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <ClipboardList className="size-5" />
                </div>

                <div className="flex flex-col items-start gap-1">
                  <span className="text-lg font-semibold">0</span>
                  <span className="text-xs text-muted-foreground">Pendientes</span>
                </div>
              </div>

              {/* Completadas */}
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <ClipboardCheck className="size-5" />
                </div>

                <div className="flex flex-col items-start gap-1">
                  <span className="text-lg font-semibold">0</span>
                  <span className="text-xs text-muted-foreground">Completadas</span>
                </div>
              </div>
            </div>
          </div>
          {/*Proyectos*/}
          <div className="w-full pb-4">
            <span className="text-sm font-medium text-muted-foreground">Proyectos</span>

            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Activos */}
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <GitGraph className="size-5" />
                </div>

                <div className="flex flex-col items-start gap-1">
                  <span className="text-lg font-semibold">0/10</span>
                  <span className="text-xs text-muted-foreground">Activos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
