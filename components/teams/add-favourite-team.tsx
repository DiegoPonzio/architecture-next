'use client';

import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { useState } from 'react';

export default function AddFavouriteTeam() {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-9 transition-colors duration-200 hover:bg-primary/10"
      aria-label="Agregar a favoritos"
      onClick={() => setIsFavorite(!isFavorite)}
    >
      <Star
        className={`size-4 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-110 ${
          isFavorite ? 'scale-110 fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
        } `}
      />
    </Button>
  );
}
