/**
 * Hook para usar layouts compuestos
 * Permite usar layouts de forma declarativa con composición
 */
'use client';

import { useMemo } from 'react';
import type { LayoutConfig } from './layout.interface';
import { LayoutComposer } from './layout-composer';

/**
 * Hook que compone un layout basado en configuración
 * @param config Configuración del layout
 * @returns Componente layout listo para usar
 */
export function useLayout(config: LayoutConfig) {
  return useMemo(() => {
    // Validar configuración en desarrollo
    if (process.env.NODE_ENV === 'development') {
      if (!LayoutComposer.validate(config)) {
        console.error('Invalid layout config:', config);
      }
    }

    return LayoutComposer.compose(config);
  }, [config]);
}

/**
 * Hook para obtener información sobre un layout
 * Útil para logging y debugging
 */
export function useLayoutInfo(config: LayoutConfig) {
  return useMemo(() => {
    return {
      name: config.name,
      providers: config.providers.map((p) => p.name),
      description: config.metadata?.description,
      info: LayoutComposer.getInfo(config),
    };
  }, [config]);
}

/**
 * Hook para crear layout personalizado
 * Permite agregar providers dinámicamente
 */
export function useCustomLayout(
  baseConfig: LayoutConfig,
  additionalProviders: typeof baseConfig.providers = [],
) {
  const customConfig = useMemo(
    () => ({
      ...baseConfig,
      name: `${baseConfig.name}Custom`,
      providers: [...baseConfig.providers, ...additionalProviders],
    }),
    [baseConfig, additionalProviders],
  );

  return useLayout(customConfig);
}
