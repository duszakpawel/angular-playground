import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { CatsRoutingModule } from './cats-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CatsSearchComponent } from './components/cats-search/cats-search.component';
import { CatsComponent } from './views/cats/cats.component';
import { CatsListComponent } from './components/cats-list/cats-list.component';
import { FallbackImageDirective } from '../../fallback-image.directive';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CatsComponent, CatsListComponent, CatsSearchComponent, FallbackImageDirective],
  imports: [
    CommonModule,
    SharedModule,
    CatsRoutingModule,
    ReactiveFormsModule,
    ScrollingModule,
    TranslateModule
  ]
})
export class CatsModule { }
