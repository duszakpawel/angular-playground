export interface Moon {
  id: number;
  planet: string;
  name: string;
}

export interface MoonSet {
  id: number;
  planet: {en: string, pl: string};
  name: {en: string, pl: string};
}
