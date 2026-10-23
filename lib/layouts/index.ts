/**
 * Exporta todas las utilidades de layouts
 */
export type { LayoutProvider, LayoutConfig } from './layout.interface';
export { LayoutComposer } from './layout-composer';
export {
  authLayoutConfig,
  dashboardLayoutConfig,
  minimalLayoutConfig,
  adminLayoutConfig,
} from './layout-config';
export { useLayout, useLayoutInfo, useCustomLayout } from './use-layout';
