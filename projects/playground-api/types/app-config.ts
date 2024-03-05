export interface AppConfig {
  version: string;
  features: {
    start: boolean;
    cats: boolean;
    labs: boolean;
  };
}
