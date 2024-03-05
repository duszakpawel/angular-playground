import { Cat } from './cat';

export interface CatsQueryParams {
  sort: keyof Cat;
  order: 'ASC' | 'DESC';
  query: string;
}
