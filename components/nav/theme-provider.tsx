'use client';

import * as React from 'react';

type Theme = 'dark' | 'light' | 'system';
type ResolvedTheme = 'dark' | 'light';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  disableTransitionOnChange?: boolean;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';

const THEME_VALUES: Theme[] = ['dark', 'light', 'system'];

const ThemeProviderContext = React.createContext<ThemeProviderState | undefined>(undefined);

function isTheme(value: string | null): value is Theme {
  return value !== null && THEME_VALUES.includes(value as Theme);
}

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia(COLOR_SCHEME_QUERY).matches ? 'dark' : 'light';
}

function disableTransitionsTemporarily() {
  const style = document.createElement('style');

  style.appendChild(
    document.createTextNode(
      '*,*::before,*::after{-webkit-transition:none!important;transition:none!important}',
    ),
  );

  document.head.appendChild(style);

  return () => {
    window.getComputedStyle(document.body);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        style.remove();
      });
    });
  };
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
  disableTransitionOnChange = true,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme);

  const [isMounted, setIsMounted] = React.useState(false);

  /**
   * Carga el tema guardado.
   */
  React.useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey);

    if (isTheme(storedTheme)) {
      setThemeState(storedTheme);
    }

    setIsMounted(true);
  }, [storageKey]);

  /**
   * Cambiar tema.
   */
  const setTheme = React.useCallback(
    (nextTheme: Theme) => {
      localStorage.setItem(storageKey, nextTheme);
      setThemeState(nextTheme);
    },
    [storageKey],
  );

  /**
   * Aplica el tema al <html>.
   */
  const applyTheme = React.useCallback(
    (nextTheme: Theme) => {
      const root = document.documentElement;

      const resolvedTheme = nextTheme === 'system' ? getSystemTheme() : nextTheme;

      const restoreTransitions = disableTransitionOnChange ? disableTransitionsTemporarily() : null;

      root.classList.remove('light', 'dark');
      root.classList.add(resolvedTheme);

      restoreTransitions?.();
    },
    [disableTransitionOnChange],
  );

  /**
   * Aplica el tema cuando cambia.
   */
  React.useEffect(() => {
    if (!isMounted) {
      return;
    }

    applyTheme(theme);

    if (theme !== 'system') {
      return;
    }

    const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY);

    const handleChange = () => {
      applyTheme('system');
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme, applyTheme, isMounted]);

  /**
   * Sincroniza el tema entre pestañas.
   */
  React.useEffect(() => {
    if (!isMounted) {
      return;
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.storageArea !== localStorage) {
        return;
      }

      if (event.key !== storageKey) {
        return;
      }

      if (isTheme(event.newValue)) {
        setThemeState(event.newValue);
      } else {
        setThemeState(defaultTheme);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [defaultTheme, storageKey, isMounted]);

  /**
   * IMPORTANTE:
   * useMemo siempre se ejecuta.
   * No debe estar después de un return condicional.
   */
  const value = React.useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme, setTheme],
  );

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}

export function useTheme() {
  const context = React.useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
