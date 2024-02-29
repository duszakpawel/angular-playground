import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedLibModule } from 'playground-lib';
import { AppConfigService } from 'playground-api/services';
import { API_URL } from 'playground-api/tokens';
import { AppConfig } from 'playground-api/types';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { StartComponent } from './views/start/start.component';
import { ForbiddenComponent } from './views/forbidden/forbidden.component';
import { BrowserComponent } from './views/browser/browser.component';
import { BusyInterceptor } from './services/busy.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as fromApp from './reducers/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HashLocationStrategy, LocationStrategy, NgOptimizedImage } from '@angular/common';
import { LanguageInterceptor } from './services/language-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

function appConfigInitializer(appConfigService: AppConfigService): () => Observable<AppConfig> {
  return () => appConfigService.getAppConfig();
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    ForbiddenComponent,
    BrowserComponent,
  ],
  imports: [
    SharedLibModule,
    BrowserModule,
    SharedModule,
    HttpClientModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    StoreModule.forRoot({}, {}),
    StoreModule.forRoot({[fromApp.appFeatureKey]: fromApp.reducer}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([])
  ],
  providers: [
    {provide: API_URL, useValue: environment.apiUrl},
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appConfigInitializer,
      deps: [AppConfigService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: BusyInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LanguageInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
