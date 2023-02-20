import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxLoadingModule } from 'ngx-loading';
import { AlertModule } from 'src/app/_alert';
import { ModalComponent } from 'src/app/_modal/component/modal.component';
import { PageNotFoundComponent } from 'src/app/_component/page-not-found/page-not-found.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    ModalComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    NgxLoadingModule,
    AlertModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  exports: [
    ModalComponent,
    NgxLoadingModule,
    AlertModule,
    PageNotFoundComponent,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
})
export class WelcomeModule { }
