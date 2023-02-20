import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxLoadingModule } from 'ngx-loading';
import { AlertModule } from 'src/app/_alert';
import { ModalComponent } from 'src/app/_modal/component/modal.component';
import { PageNotFoundComponent } from 'src/app/_component/page-not-found/page-not-found.component';
import { popper } from '@popperjs/core';



@NgModule({
  declarations: [
    ModalComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    NgxLoadingModule,
    AlertModule,
  ],
  exports: [
    ModalComponent,
    NgxLoadingModule,
    AlertModule,
    PageNotFoundComponent
  ],
})
export class WelcomeModule { }
