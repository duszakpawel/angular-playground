import { InjectionToken, inject } from "@angular/core";
import { AppConfigService } from "playground-api/services";
import { AppConfig } from "playground-api/types";

export const APP_CONFIG = new InjectionToken<AppConfig | null>('APP_CONFIG', {
  providedIn: 'root',
  factory: () => inject(AppConfigService).currentAppConfig
});
