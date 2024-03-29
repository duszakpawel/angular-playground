import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConfig } from 'playground-api/types';
import { APP_CONFIG } from '../app-config-token';

@Injectable({
  providedIn: 'root'
})
export class FeatureEnabledGuard  {
  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const feature = route.data['feature'];
    return this.isFeatureEnabled(feature);
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree {
    const feature = route.data?.['feature'];
    if (!feature) {
      console.warn(`feature name has not been provided in route definition`);
      return true;
    }
    return this.isFeatureEnabled(feature);
  }


  private isFeatureEnabled(name: keyof AppConfig['features']): boolean | UrlTree {
    return this.appConfig.features[name] || this.router.createUrlTree(['forbidden']);
  }

}
