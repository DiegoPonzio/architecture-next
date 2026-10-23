import React from 'react';

import type { LayoutConfig } from './layout.interface';

export class LayoutComposer {
  /**
   * Crea un componente layout combinando múltiples providers.
   *
   * Los providers se envuelven en el orden definido:
   *
   * Provider A
   *   └── Provider B
   *        └── Provider C
   *             └── children
   */
  static compose(config: LayoutConfig): React.ComponentType<{
    children: React.ReactNode;
  }> {
    const providers = config.providers ?? [];

    return function ComposedLayout({ children }: { children: React.ReactNode }) {
      return providers.reduceRight<React.ReactNode>((acc, provider) => {
        return React.createElement(provider.component, null, acc);
      }, children);
    };
  }

  /**
   * Valida que la configuración del layout
   * contenga providers válidos.
   */
  static validate(config: LayoutConfig): boolean {
    if (!config) {
      return false;
    }

    if (!config.name) {
      return false;
    }

    if (!Array.isArray(config.providers)) {
      return false;
    }

    return config.providers.every(
      (provider) =>
        Boolean(provider) &&
        Boolean(provider.name) &&
        Boolean(provider.component) &&
        typeof provider.component === 'function',
    );
  }

  /**
   * Obtiene información del layout.
   */
  static getInfo(config: LayoutConfig): string {
    if (!config) {
      return 'Invalid layout configuration';
    }

    const providers = config.providers?.map((provider) => provider.name).join(' → ');

    return `${config.name}: ${providers || 'No providers'}`;
  }
}
