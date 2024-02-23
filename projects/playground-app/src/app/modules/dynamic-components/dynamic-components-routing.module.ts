import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicComponentLoaderComponent } from './views/dynamic-component-loader/dynamic-component-loader.component';

const routes: Routes = [
  {path: '', component: DynamicComponentLoaderComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicComponentsRoutingModule { }
