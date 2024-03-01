import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeatureEnabledGuard } from './services/feature-enabled.guard';
import { BrowserComponent } from './views/browser/browser.component';
import { ForbiddenComponent } from './views/forbidden/forbidden.component';
import { StartComponent } from './views/start/start.component';

const routes: Routes = [
  {
    path: 'forbidden',
    component: ForbiddenComponent
  },
  {
    path: 'start', component: StartComponent,
    canActivate: [FeatureEnabledGuard],
    data: {feature: 'start', animation: 'start'}
  },
  {
    path: 'cats',
    loadChildren: () => import('./modules/cats/cats.module').then(module => module.CatsModule),
    canLoad: [FeatureEnabledGuard],
    data: {feature: 'cats', animation: 'cats'}
  },
  {
    path: 'labs',
    loadChildren: () => import('./modules/labs/labs.module').then(module => module.LabsModule),
    canLoad: [FeatureEnabledGuard],
    data: {feature: 'labs', animation: 'labs'}
  },
  {
    path: 'ask',
    loadChildren: () => import('./modules/ask/ask.module').then(module => module.AskModule),
    data: {animation: 'ask'}
  },
  {
    path: 'dynamic-components',
    loadChildren: () => import('./modules/dynamic-components/dynamic-components.module').then(module => module.DynamicComponentsModule),
    data: {animation: 'dynamic-components'}
  },
  {
    path: 'url/:url',
    outlet: 'browser',
    component: BrowserComponent
  },
  {
    path: '**',
    redirectTo: 'start',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
