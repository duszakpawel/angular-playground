import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AskRoutingModule } from './ask-routing.module';
import { AskComponent } from './views/ask/ask.component';

@NgModule({
  declarations: [AskComponent],
  imports: [
    CommonModule,
    SharedModule,
    AskRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class AskModule { }
