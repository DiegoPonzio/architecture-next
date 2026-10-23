/**
 * Interfaz para composición de layouts
 * Define cómo se estructura un layout
 */
export interface LayoutProvider {
  name: string;
  component: React.ComponentType<{ children: React.ReactNode }>;
}

/**
 * Interfaz para configuración de layout
 * Define qué providers debe tener un layout
 */
export interface LayoutConfig {
  name: string;
  providers: LayoutProvider[];
  metadata?: {
    description?: string;
    title?: string;
  };
}
