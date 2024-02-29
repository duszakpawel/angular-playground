import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppConfig } from 'playground-api/types';
import { APP_CONFIG } from './app-config-token';
import { selectNavigationVisible } from './selectors/app.selectors';
import { BusyInterceptor } from './services/busy.interceptor';
import { PushService } from './services/push.service';
import { UpdateService } from './services/update.service';
import { showNavigation, hideNavigation } from './actions/app.actions';
import { TranslateService } from '@ngx-translate/core';
import { defaultLang } from './services/language-interceptor.service';
import { sequentialFadeAnimation } from './route-animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [sequentialFadeAnimation]
})
export class AppComponent {
  title = 'playground-app';
  appVersion = this.appConfig.version;
  busy = this.busyInterceptor.busy;
  isSubscribed = this.push.isSubscribed;
  updateAvailable = this.update.updateAvailable;
  unrecoverableError = this.update.unrecoverableError;
  navigationVisible = this.store.select(selectNavigationVisible);

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig, private busyInterceptor: BusyInterceptor, private update: UpdateService, private push: PushService, private store: Store, private translate: TranslateService) {
    translate.setDefaultLang(defaultLang);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }

  activateUpdate(): void {
    this.update.activateUpdate();
  }

  reloadApp(): void {
    this.update.reloadApp();
  }

  requestSubscription() {
    this.push.requestSubscription().subscribe();
  }

  revokeSubscription() {
    this.push.revokeSubscription().subscribe();
  }

  showNavigation(): void {
    this.store.dispatch(showNavigation());
  }

  hideNavigation(): void {
    this.store.dispatch(hideNavigation());
  }
}
