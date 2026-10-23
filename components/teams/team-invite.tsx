'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TeamInviteProps {
  value: string[];
  onChange: (email: string[]) => void;
}

export function TeamInvite({ value, onChange }: TeamInviteProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  const addEmail = () => {
    const trimmed = email.trim().toLowerCase();

    if (!trimmed) return;

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);

    if (!isValidEmail) {
      setError(true);
      return;
    }

    if (value.includes(trimmed)) {
      setEmail('');
      return;
    }

    onChange([...value, trimmed]);
    setEmail('');
    setError(false);
  };

  const removeEmail = (email: string) => {
    onChange(value.filter((v) => v !== email));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Field>
          <FieldLabel>Invitar miembros</FieldLabel>

          <div className="flex gap-2">
            <Input
              placeholder="correo@example.com"
              value={email}
              aria-invalid={error}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addEmail();
                }
              }}
            />

            <Button type="button" onClick={addEmail}>
              <Plus />
              Agregar
            </Button>
          </div>
        </Field>
        <p className="text-sm text-muted-foreground">
          Presiona Enter o el botón para agregar un invitado.
        </p>
      </div>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((email) => (
            <Badge key={email} variant="secondary" className="gap-1 pr-1">
              {email}

              <button
                type="button"
                onClick={() => removeEmail(email)}
                className="rounded-full p-0.5 hover:bg-muted"
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
