import { Cat } from './cat';

export type CatDetailsUpdate = Pick<Cat, 'id' | 'description'>;
