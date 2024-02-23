import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { TranslateModule } from '@ngx-translate/core';
import { DynamicComponentsRoutingModule } from './dynamic-components-routing.module';
import { DynamicComponentLoaderComponent } from './views/dynamic-component-loader/dynamic-component-loader.component';
import { DynamicComponentTwoComponent } from './components/dynamic-component-two/dynamic-component-two.component';
import { DynamicComponentOneComponent } from './components/dynamic-component-one/dynamic-component-one.component';

@NgModule({
  declarations: [DynamicComponentLoaderComponent, DynamicComponentOneComponent, DynamicComponentTwoComponent],
  imports: [
    CommonModule,
    SharedModule,
    DynamicComponentsRoutingModule,
    TranslateModule
  ]
})
export class DynamicComponentsModule { }
