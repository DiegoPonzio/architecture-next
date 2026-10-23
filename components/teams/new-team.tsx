'use client';

import { useState } from 'react';
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TeamInvite } from '@/components/teams/team-invite';
import { Button } from '@/components/ui/button';

export function NewTeam() {
  const [emails, setEmails] = useState<string[]>([]);

  return (
    <form>
      <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]">
        <DrawerHeader>
          <DrawerTitle>Nuevo Equipo</DrawerTitle>
          <DrawerDescription>Crea un nuevo equipo.</DrawerDescription>
        </DrawerHeader>

        <div className="no-scrollbar overflow-y-auto px-4">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Field>
                {/*data-invalid={!!errors.login}*/}
                <FieldLabel htmlFor="team-name">Nombre del Equipo</FieldLabel>
                <Input
                  id="team-name"
                  type="text"
                  placeholder="Acme Inc"
                  // aria-invalid={!!errors.login}
                  //{...register('login')}
                />

                {/*{errors.login && (*/}
                {/*    <FieldDescription className="text-destructive">*/}
                {/*      {errors.login.message}*/}
                {/*    </FieldDescription>*/}
                {/*)}*/}
              </Field>
            </div>
            <div className="grid gap-2">
              <Field>
                <FieldLabel htmlFor="team-short-description">
                  Descripción corta del Equipo
                </FieldLabel>
                <Input
                  id="team-short-description"
                  type="text"
                  placeholder="Una breve descripción del equipo"
                  // aria-invalid={!!errors.login}
                  //{...register('login')}
                />

                {/*{errors.login && (*/}
                {/*    <FieldDescription className="text-destructive">*/}
                {/*      {errors.login.message}*/}
                {/*    </FieldDescription>*/}
                {/*)}*/}
              </Field>
            </div>
            <div className="grid gap-2">
              <Field>
                <FieldLabel htmlFor="team-description">Descripción del Equipo</FieldLabel>
                <Textarea
                  id="team-description"
                  placeholder="Aquí puedes agregar una descripción más detallada de tu equipo, incluyendo su misión, visión y objetivos."
                  // aria-invalid={!!errors.login}
                  //{...register('login')}
                />

                {/*{errors.login && (*/}
                {/*    <FieldDescription className="text-destructive">*/}
                {/*      {errors.login.message}*/}
                {/*    </FieldDescription>*/}
                {/*)}*/}
              </Field>
            </div>
            <div className="grid gap-2">
              <TeamInvite value={emails} onChange={setEmails} />
            </div>
          </div>
        </div>
        <DrawerFooter>
          <Button>Crear</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </form>
  );
}
