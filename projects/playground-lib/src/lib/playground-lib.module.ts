import { NgModule } from '@angular/core';
import { SharedLibComponent } from './playground-lib.component';
import { LogoComponent } from './logo/logo.component';



@NgModule({
  declarations: [
    SharedLibComponent,
    LogoComponent
  ],
  imports: [
  ],
  exports: [
    SharedLibComponent,
    LogoComponent
  ]
})
export class SharedLibModule { }
