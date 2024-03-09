import { AppConfig } from '../types';

const now = new Date();

export const mockedAppConfig: AppConfig = {
  version: `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`,
  features: {
    start: true,
    cats: true,
    labs: true
  }
};
